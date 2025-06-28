"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Car, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getRecommendation } from "@/app/actions";
import type { RecommendSuitableCarOutput } from "@/ai/flows/recommend-suitable-car";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  intendedUse: z.string().min(5, { message: "Please describe your travel purpose (at least 5 characters)" }),
  preferences: z.string().min(5, { message: "Please state your requirements (at least 5 characters)" }),
  distance: z.coerce.number().positive({ message: "Please enter a valid distance" }).max(10000, { message: "Distance must not exceed 10,000 km." }),
});

type FormValues = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<RecommendSuitableCarOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intendedUse: "",
      preferences: "",
      distance: 100,
    },
  });

  function onSubmit(values: FormValues) {
    setResult(null);
    startTransition(async () => {
      const { data, error } = await getRecommendation({
        ...values,
        distance: values.distance.toString(),
      });
      if (error) {
        toast({
          title: "An Error Occurred",
          description: error,
          variant: "destructive",
        });
        return;
      }
      setResult(data);
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Find Your Perfect Car</CardTitle>
          <CardDescription>Fill out the form below to get a personalized recommendation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="intendedUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intended Use</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Family trip to Chiang Mai, business in Bangkok" {...field} />
                    </FormControl>
                    <FormDescription>What's the main purpose of your trip?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Preferences</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 5 seats, large luggage space, fuel efficient" {...field} />
                    </FormControl>
                    <FormDescription>Any special requirements for the car?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Distance (km)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 500" {...field} />
                    </FormControl>
                    <FormDescription>How far do you plan to travel?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating recommendation...
                  </>
                ) : "Get Recommendation"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8 lg:mt-0">
        <Card className="bg-muted/50 rounded-lg min-h-[300px] flex items-center justify-center p-6">
          {isPending && <RecommendationSkeleton />}
          {!isPending && result && (
            <div className="text-center w-full animate-in fade-in duration-500">
               <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <ThumbsUp className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-2xl">Our Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary text-primary-foreground p-4 rounded-md">
                  <p className="text-lg font-semibold flex items-center justify-center gap-2">
                    <Car/>
                    {result.carRecommendation}
                  </p>
                </div>
                <p className="text-muted-foreground">{result.suitabilityExplanation}</p>
              </CardContent>
            </div>
          )}
           {!isPending && !result && (
            <div className="text-center text-muted-foreground p-8">
              <p>Your personalized car recommendation will appear here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function RecommendationSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full p-4">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6" />
    </div>
  );
}
