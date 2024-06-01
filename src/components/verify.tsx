import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { validateRelationSchema } from "~/server/api/schema/keto.schema";
import { api } from "~/utils/api";
import { useToast } from "./ui/use-toast";

const Verify = () => {
  const { mutateAsync, isLoading, data } =
    api.keto.validateRelation.useMutation();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      object: "",
      relation: "",
      subject: "",
    },
    validationSchema: toFormikValidationSchema(
      validateRelationSchema.omit({ namespace: true }),
    ),
    onSubmit: async (values) => {
      await mutateAsync(
        {
          ...values,
          namespace: "maintain",
        },
        {
          onSuccess(data) {
            if (data?.allowed) {
              toast({
                title: "Relation Verified",
                description: `Relation ${values.relation} verified successfully`,

                duration: 5000,
              });
            } else {
              toast({
                title: "Relation Not Verified",
                variant: "destructive",
                description: `Relation ${values.relation} not verified`,

                duration: 5000,
              });
            }
            formik.resetForm();
          },
          onError(error) {
            toast({
              title: "Error",
              variant: "destructive",
              description: error.message,
              duration: 5000,
            });
          },
        },
      );
    },
  });
  return (
    <div className="flex min-w-[350px] flex-col">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="object">Object</Label>
            <Input
              type="text"
              name="object"
              id="object"
              placeholder="Object to relate"
              value={formik.values.object}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.object && formik.touched.object ? (
              <p className="text-xs text-red-500">{formik.errors.object}</p>
            ) : null}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="relation">Relation</Label>
            <Input
              type="text"
              name="relation"
              id="relation"
              placeholder="Relation to attach"
              value={formik.values.relation.toUpperCase()}
              onChange={(e) => {
                void formik.setFieldValue(
                  "relation",
                  e.target.value.toUpperCase(),
                );
              }}
              onBlur={formik.handleBlur}
            />
            {formik.errors.relation && formik.touched.relation ? (
              <p className="text-xs text-red-500">{formik.errors.relation}</p>
            ) : null}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="subject">Subject_id</Label>
            <Input
              type="text"
              name="subject"
              id="subject"
              placeholder="User in reference"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.subject && formik.touched.subject ? (
              <p className="text-xs text-red-500">{formik.errors.subject}</p>
            ) : null}
          </div>
          <div className="flex justify-between">
            <Button variant="outline">Clear</Button>
            <Button type="submit">Verify</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Verify;
