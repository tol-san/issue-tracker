import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import React from 'react'
import Markdown from 'react-markdown';

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <div className="prose">
      <Heading>{issue.title}</Heading>
      <Flex gap="5" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
}

export default IssueDetails