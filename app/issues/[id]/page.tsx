import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="5" my="3">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
