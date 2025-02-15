import { Business, InsertBusiness, Hook, InsertHook } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { businesses, hooks } from "@shared/schema";

export interface IStorage {
  createBusiness(business: InsertBusiness): Promise<Business>;
  getBusiness(id: number): Promise<Business | undefined>;
  createHook(hook: InsertHook): Promise<Hook>;
  getHooksForBusiness(businessId: number): Promise<Hook[]>;
}

export class DatabaseStorage implements IStorage {
  async createBusiness(business: InsertBusiness): Promise<Business> {
    const [newBusiness] = await db
      .insert(businesses)
      .values(business)
      .returning();
    return newBusiness;
  }

  async getBusiness(id: number): Promise<Business | undefined> {
    const [business] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, id));
    return business;
  }

  async createHook(hook: InsertHook): Promise<Hook> {
    const [newHook] = await db
      .insert(hooks)
      .values(hook)
      .returning();
    return newHook;
  }

  async getHooksForBusiness(businessId: number): Promise<Hook[]> {
    return db
      .select()
      .from(hooks)
      .where(eq(hooks.businessId, businessId));
  }
}

export const storage = new DatabaseStorage();