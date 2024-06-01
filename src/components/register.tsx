import React from "react";
import { Button } from "~/components/ui/button";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CornerDownRight, Loader2 } from "lucide-react";
import { createRelationSchema } from "~/server/api/schema/keto.schema";
import { useToast } from "./ui/use-toast";
import { api } from "~/utils/api";
import { Switch } from "./ui/switch";
import { AnimatePresence, motion } from "framer-motion";

const Register = () => {
  const { mutateAsync, isLoading } = api.keto.createRelation.useMutation();
  const { refetch } = api.keto.getAllRelations.useQuery({
    namespace: "maintain",
  });
  const { toast } = useToast();
  const [subOpen, setSubOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      object: "",
      relation: "",
      subject: "",
      sub_object: "",
      sub_relation: "",
    },
    validationSchema: toFormikValidationSchema(
      createRelationSchema.omit({ namespace: true }),
    ),
    onSubmit: async (values) => {
      await mutateAsync(
        {
          ...values,
          namespace: "maintain",
        },
        {
          async onSuccess(_) {
            await refetch();
            toast({
              title: "Relation Created",
              description: `Relation ${values.relation} created successfully`,
              // status: "success",
              duration: 5000,
            });
            formik.resetForm();
          },
          onError(error) {
            toast({
              title: "Error",
              description: error.message,
              // status: "error",
              duration: 5000,
            });
          },
        },
      );
    },
  });
  return (
    <div className="mt-2 flex h-auto min-w-[350px] flex-col transition-all duration-300">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="object">Object</Label>
            <Input
              type="text"
              name="object"
              value={formik.values.object}
              id="object"
              placeholder="Object to relate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.object && formik.errors.object ? (
              <div className="text-sm text-red-500">{formik.errors.object}</div>
            ) : null}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="relation">Relation</Label>
            <Input
              type="text"
              name="relation"
              value={formik.values.relation.toUpperCase()}
              id="relation"
              placeholder="Relation to attach"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                void formik.setFieldValue(
                  "relation",
                  e.target.value.toUpperCase(),
                );
              }}
            />
            {formik.touched.relation && formik.errors.relation ? (
              <div className="text-sm text-red-500">
                {formik.errors.relation}
              </div>
            ) : null}
          </div>
          <AnimatePresence>
            {!subOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-1.5"
              >
                <Label htmlFor="subject">Subject_id</Label>
                <Input
                  type="text"
                  name="subject"
                  value={formik.values.subject}
                  id="subject"
                  placeholder="User in reference"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.subject && formik.errors.subject ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.subject}
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {subOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between gap-6"
              >
                <div>
                  <CornerDownRight className="h-6 w-6" />
                </div>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="sub_object">Sub-Object</Label>
                    <Input
                      type="text"
                      name="sub_object"
                      value={formik.values.sub_object}
                      id="sub_object"
                      placeholder="Sub Object to relate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.sub_object && formik.errors.sub_object ? (
                      <div className="text-sm text-red-500">
                        {formik.errors.sub_object}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="sub_relation">Sub-Relation</Label>
                    <Input
                      type="text"
                      name="sub_relation"
                      value={formik.values.sub_relation.toUpperCase()}
                      id="sub_relation"
                      placeholder="Sub Relation to attach"
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        void formik.setFieldValue(
                          "sub_relation",
                          e.target.value.toUpperCase(),
                        );
                      }}
                    />
                    {formik.touched.sub_relation &&
                    formik.errors.sub_relation ? (
                      <div className="text-sm text-red-500">
                        {formik.errors.sub_relation}
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-2 flex justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-xs font-medium text-gray-300">SUB</h3>
              <Switch
                checked={subOpen}
                onCheckedChange={(e) => setSubOpen(e)}
              />
            </div>
            <Button disabled={formik.isSubmitting || isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
