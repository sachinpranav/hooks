import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertBusinessSchema } from "@shared/schema";
import { generateHooks } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";
import { Loader2, Instagram } from "lucide-react";

export default function Home() {
  const [hooks, setHooks] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertBusinessSchema),
    defaultValues: {
      name: "",
      industry: "",
      targetAudience: "",
      products: "",
      brandVoice: "",
      customPrompt: "",
    },
  });

  const mutation = useMutation({
    mutationFn: generateHooks,
    onSuccess: (data) => {
      setHooks(data.hooks.map((h) => h.content));
      toast({
        title: "Hooks generated!",
        description: "Your Instagram hooks are ready to use",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Instagram className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Instagram Hooks Generator
            </h1>
          </div>
          <p className="text-gray-600">
            Generate engaging Instagram hooks for your business using AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your business name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Fashion, Technology" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="Who are your customers?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Products/Services</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your main products or services"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brandVoice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Voice</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Professional, Casual, Luxury"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The tone and style of your brand's communication
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customPrompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Generation Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add custom instructions for generating hooks (e.g., 'Make them more humorous' or 'Focus on pain points')"
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Customize how your hooks are generated. Leave empty to use default style.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Hooks"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Generated Hooks</h2>
            {hooks.length > 0 ? (
              hooks.map((hook, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start gap-4">
                      <p className="flex-1">{hook}</p>
                      <CopyButton text={hook} />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  Fill out the form to generate Instagram hooks
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}