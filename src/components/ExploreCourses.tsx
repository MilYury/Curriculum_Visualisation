/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  BackgroundVariant
} from 'reactflow';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';

import 'reactflow/dist/style.css';
import type ISubject from '../interfaces/ISubject';
import type ISPK from '../interfaces/ISPK';
import { SubjectNode } from './Nodes';

interface INodeEdges {
  nodes: any[];
  edges: any[];
}

const isSPK = (item: ISubject | ISPK): boolean => {
  return /^[A-Z]{3}/.test(item.StudyPackageCd ?? '');
};

const ExploreCourses: React.FC = () => {
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  const generateNodesAndEdges = (
    item: ISubject | ISPK,
    offsetX: number,
    offsetY: number,
    processedNodes: Set<string> = new Set()
  ): INodeEdges => {
    if (processedNodes.has(item.StudyPackageCd ?? 'defaultId')) {
      return { nodes: [], edges: [] };
    }

    const nodes = [];
    const edges: Array<{ id: string; source: string; target: string }> = [];

    if (!isSPK(item)) {
      nodes.push({
        id: item?.StudyPackageCd ?? 'defaultId',
        position: { x: offsetX, y: offsetY },
        data: { label: item?.FullTitle ?? 'defaultTitle' },
        type: 'subject'
      });
      processedNodes.add(item.StudyPackageCd ?? 'defaultId');
    }

    const spacing = 1000;

    if (isSPK(item)) {
      const relatedSubjects = (item as ISPK).RelatedSubjects ?? [];
      relatedSubjects.forEach((subject, index) => {
        const angle = ((2 * Math.PI) / relatedSubjects.length) * index;

        const directionX = Math.cos(angle);
        const directionY = Math.sin(angle);

        const { nodes: subjectNodes, edges: subjectEdges } =
          generateNodesAndEdges(
            subject,
            offsetX + spacing * directionX,
            offsetY + spacing * directionY,
            processedNodes
          );

        nodes.push(...subjectNodes);

        edges.push({
          id: `${selectedCourse?.StudyPackageCd ?? 'defaultId'}-${
            subject.StudyPackageCd ?? 'defaultTargetId'
          }-${index}`,
          source: selectedCourse?.StudyPackageCd ?? 'defaultId',
          target: subject.StudyPackageCd ?? 'defaultTargetId'
        });

        edges.push(...subjectEdges);
      });
    }

    const relatedSPKs = (item as ISPK).RelatedSPK ?? [];
    relatedSPKs.forEach((spk, index) => {
      const angle = ((2 * Math.PI) / relatedSPKs.length) * index;

      const directionX = Math.cos(angle);
      const directionY = Math.sin(angle);

      const { nodes: spkNodes, edges: spkEdges } = generateNodesAndEdges(
        spk,
        offsetX + spacing * directionX,
        offsetY + spacing * directionY,
        processedNodes
      );

      nodes.push(...spkNodes);
      edges.push(...spkEdges);
    });

    return { nodes, edges };
  };

  const courseNode = {
    id: selectedCourse?.StudyPackageCd ?? 'defaultId',
    position: { x: 250, y: 0 },
    data: { label: selectedCourse?.FullTitle ?? 'defaultCourseTitle' }
  };

  let offsetX = window.innerWidth / 2;
  const offsetY = window.innerHeight / 2;

  const subjectNodesAndEdges = selectedCourse?.Subjects?.flatMap((subject) => {
    const { nodes, edges } = generateNodesAndEdges(subject, offsetX, offsetY);
    offsetX += 250;
    return { nodes, edges };
  });

  const spkNodesAndEdges = selectedCourse?.SPKs?.flatMap((spk) => {
    const { nodes, edges } = generateNodesAndEdges(spk, offsetX, offsetY);
    offsetX += 250;
    return { nodes, edges };
  });

  const nodes = [courseNode];
  const edges:
    | Array<{ id: string; source: string; target: string }>
    | undefined = [];

  subjectNodesAndEdges?.forEach((item) => {
    nodes.push(...item.nodes);
    edges.push(
      {
        id: `${courseNode?.id}-${item?.nodes[0]?.id}`,
        source: courseNode?.id,
        target: item?.nodes[0]?.id
      },
      ...item.edges
    );
  });

  spkNodesAndEdges?.forEach((item) => {
    nodes.push(...item.nodes);
    edges.push(...item.edges);
  });

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ subject: SubjectNode }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default ExploreCourses;
