import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { useSharedPages } from "../../hooks/queries/useSharedPages";
import { useCreatePage } from "../../hooks/mutations/useCreatePage";
import { Site } from "../../types/yext";

interface PageSelectorProps {
  site: Site;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  navSection: string;
  parentPageId: string;
}

const PageSelector = ({ site, open, onOpenChange }: PageSelectorProps) => {
  const { data: pages, isLoading } = useSharedPages(site.meta.id);
  const siteSections = site.c_header
    .map((header) => header.title)
    .filter((section) => section !== "Home");
  const createPageMutation = useCreatePage();

  const form = useForm<FormValues>({
    defaultValues: {
      navSection: "",
      parentPageId: "",
    },
  });

  const onCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = async (data: FormValues) => {
    onOpenChange(false);
    await createPageMutation.mutateAsync({
      siteId: site.meta.id,
      req: data,
    });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Button
        variant={"secondary"}
        className="rounded-full border bg-purple-300"
      >
        <DialogTrigger className="w-full h-full">Add Page</DialogTrigger>
      </Button>
      <DialogContent className="min-w-[1100px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="navSection"
              rules={{ required: "Nav Section is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navigation Section</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        {siteSections.map((section) => (
                          <SelectItem
                            className="bg-white"
                            key={section}
                            value={section}
                          >
                            {section}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentPageId"
              rules={{ required: "Page is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-1"
                    >
                      <div className="h-[500px] relative overflow-auto">
                        <ul role="list" className="divide-y divide-gray-100">
                          {pages?.map((page) => (
                            <li
                              key={page.meta.id}
                              className="flex items-center justify-between gap-x-6 py-5"
                            >
                              <div className="min-w-0">
                                <div className="flex items-start gap-x-3">
                                  <RadioGroupItem
                                    value={page.meta.id}
                                    id={page.meta.id}
                                  />
                                  <label
                                    htmlFor={page.meta.id}
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                  >
                                    {page.c_pageTitle}
                                  </label>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Add to Site Section</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PageSelector;
