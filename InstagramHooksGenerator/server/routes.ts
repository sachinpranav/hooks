import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { insertBusinessSchema, insertHookSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  app.post("/api/business", async (req, res) => {
    try {
      const businessData = insertBusinessSchema.parse(req.body);
      const business = await storage.createBusiness(businessData);

      const defaultPrompt = `Generate 5 engaging Instagram hooks for a business with the following details:
        Business Name: ${business.name}
        Industry: ${business.industry}
        Target Audience: ${business.targetAudience}
        Products/Services: ${business.products}
        Brand Voice: ${business.brandVoice}

        Make them attention-grabbing, concise, and suited for Instagram. Format as a JSON array of strings.
        Each hook should be less than 150 characters and include emojis where appropriate.
        Focus on creating curiosity and engagement.`;

      const prompt = business.customPrompt 
        ? `${business.customPrompt}\n\nBusiness Details:\n${JSON.stringify(business, null, 2)}\n\nFormat the response as a JSON array of strings.`
        : defaultPrompt;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let hooks: string[];

      try {
        hooks = JSON.parse(response.text());
        if (!Array.isArray(hooks)) {
          throw new Error("Generated content is not an array");
        }
      } catch (error) {
        // If JSON parsing fails, try to extract content between brackets
        const text = response.text();
        const match = text.match(/\[([\s\S]*)\]/);
        if (match) {
          hooks = match[1]
            .split(",")
            .map(hook => hook.trim().replace(/^"|"$/g, ""))
            .filter(hook => hook.length > 0);
        } else {
          throw new Error("Could not parse generated hooks");
        }
      }

      // Store each hook in the database
      const savedHooks = await Promise.all(
        hooks.map(content =>
          storage.createHook({
            businessId: business.id,
            content,
          })
        )
      );

      const generatedHooks = await storage.getHooksForBusiness(business.id);
      res.json({ business, hooks: generatedHooks });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ error: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}