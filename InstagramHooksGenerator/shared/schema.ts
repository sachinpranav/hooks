import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry").notNull(),
  targetAudience: text("target_audience").notNull(),
  products: text("products").notNull(),
  brandVoice: text("brand_voice").notNull(),
  customPrompt: text("custom_prompt"),
});

export const hooks = pgTable("hooks", {
  id: serial("id").primaryKey(),
  businessId: serial("business_id").references(() => businesses.id),
  content: text("content").notNull(),
});

export const insertBusinessSchema = createInsertSchema(businesses).pick({
  name: true,
  industry: true,
  targetAudience: true,
  products: true,
  brandVoice: true,
  customPrompt: true,
});

export const insertHookSchema = createInsertSchema(hooks).pick({
  businessId: true,
  content: true,
});

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;
export type InsertHook = z.infer<typeof insertHookSchema>;
export type Hook = typeof hooks.$inferSelect;