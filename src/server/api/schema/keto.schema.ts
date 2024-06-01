import { z } from "zod";

export const getRelationsSchema = z.object({
  namespace: z.string(),
});

export const createRelationSchema = z.object({
  namespace: z.string(),
  object: z.string(),
  relation: z.string(),
  subject: z.string().optional(),
  sub_object: z.string().optional(),
  sub_relation: z.string().optional(),
});

export const validateRelationSchema = z.object({
  namespace: z.string(),
  object: z.string(),
  relation: z.string(),
  subject: z.string(),
  maxDepth: z.number().optional(),
});

export const deleteRelationSchema = z.object({
  namespace: z.string(),
  object: z.string(),
  relation: z.string(),
  subject: z.string().optional(),
  sub_object: z.string().optional(),
  sub_relation: z.string().optional(),
});
