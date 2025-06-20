import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecipeInfoCard({
  markup,
  title,
}: {
  title: string;
  markup: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription
          dangerouslySetInnerHTML={{
            __html: markup,
          }}
        />
      </CardContent>
    </Card>
  );
}
