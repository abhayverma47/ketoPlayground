import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";
import {
  createRelationSchema,
  deleteRelationSchema,
  getRelationsSchema,
  validateRelationSchema,
} from "../schema/keto.schema";

const baseReadUrl = env.KETO_READ_API_URL;
const baseWriteUrl = env.KETO_WRITE_API_URL;

export const ketoRouter = createTRPCRouter({
  status: publicProcedure.query(async () => {
    try {
      const { status } = (await axios.get(`${baseReadUrl}/health/ready`))
        .data as {
        status: string;
      };
      return { status };
    } catch (error) {
      if (error instanceof Error) {
        return { status: "error", message: error.message };
      }
    }
  }),
  getNamespaces: publicProcedure.query(async () => {
    try {
      const res = (await axios.get(`${baseReadUrl}/namespaces`)).data as {
        namespaces: { name: string }[];
      };
      return { namespaces: res.namespaces };
    } catch (error) {
      console.log(error);
    }
  }),
  getAllRelations: publicProcedure
    .input(getRelationsSchema)
    .query(async ({ input }) => {
      try {
        const res = (
          await axios.get(
            `${baseReadUrl}/relation-tuples?namespace=${input.namespace}`,
          )
        ).data as {
          relation_tuples: {
            namespace: string;
            object: string;
            relation: string;
            subject_id: string;
            subject_set: {
              namespace: string;
              object: string;
              relation: string;
            };
          }[];
        };
        return { data: res.relation_tuples };
      } catch (error) {
        console.log(error);
      }
    }),
  createRelation: publicProcedure
    .input(createRelationSchema)
    .mutation(async ({ input }) => {
      try {
        const body = {
          namespace: input.namespace,
          object: input.object,
          relation: input.relation,
          subject_id: input.subject === "" ? null : input.subject,
          subject_set: {
            namespace: !!!input.subject ? input.namespace : null,
            object: input.sub_object ?? null,
            relation: input.sub_relation ?? null,
          },
        };
        const res = (
          await axios.put(`${baseWriteUrl}/admin/relation-tuples`, body)
        ).data as {
          namespace: string;
          object: string;
          relation: string;
          subject_id: string;
        };
        return { data: res };
      } catch (error) {
        console.log(error);
      }
    }),
  validateRelation: publicProcedure
    .input(validateRelationSchema)
    .mutation(async ({ input }) => {
      try {
        const { allowed } = (
          await axios.post(
            `${baseReadUrl}/relation-tuples/check?max-depth=${input.maxDepth ?? 5}`,
            {
              namespace: input.namespace,
              object: input.object,
              relation: input.relation,
              subject_id: input.subject,
            },
          )
        ).data as {
          allowed: boolean;
        };
        return { allowed };
      } catch (error) {
        console.log(error);
        return { allowed: false };
      }
    }),
  deleteRelation: publicProcedure
    .input(deleteRelationSchema)
    .mutation(async ({ input }) => {
      try {
        const extensionURL = `namespace=${input.namespace}&object=${input.object}&relation=${input.relation}&${input.subject ? `subject_id=${input.subject}` : `subject_set.namespace=${input.namespace}&subject_set.object=${input.sub_object}&subject_set.relation=${input.sub_relation}`}`;
        const { allowed } = (
          await axios.delete(
            `${baseWriteUrl}/admin/relation-tuples?${extensionURL}`,
          )
        ).data as {
          allowed: boolean;
        };
        return { allowed };
      } catch (error) {
        console.log(error);
        return { allowed: false };
      }
    }),
  editRelation: publicProcedure
    .input(createRelationSchema)
    .mutation(async ({ input }) => {
      try {
        const body = {
          namespace: input.namespace,
          object: input.object,
          relation: input.relation,
          subject_id: input.subject === "" ? null : input.subject,
          subject_set: {
            namespace: !!!input.subject ? input.namespace : null,
            object: input.sub_object ?? null,
            relation: input.sub_relation ?? null,
          },
        };
        const res = (
          await axios.put(`${baseWriteUrl}/admin/relation-tuples`, body)
        ).data as {
          namespace: string;
          object: string;
          relation: string;
          subject_id: string;
        };
        return { data: res };
      } catch (error) {
        console.log(error);
      }
    }),
});
