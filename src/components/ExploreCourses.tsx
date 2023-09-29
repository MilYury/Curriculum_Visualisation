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

interface INodeEdges {
  nodes: any[];
  edges: any[];
}

const ExploreCourses: React.FC = () => {
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  const generateNodesAndEdges = (
    item: ISubject | ISPK,
    offsetX: number,
    offsetY: number
  ): INodeEdges => {
    const nodes = [];
    const edges: Array<{ id: string; source: string; target: string }> = [];

    nodes.push({
      id: item?.StudyPackageCd ?? 'defaultId',
      position: { x: offsetX, y: offsetY },
      data: { label: item?.FullTitle ?? 'defaultTitle' }
    });

    const spacingX = 500;
    const spacingY = 250;

    if ('PreRequisites' in item) {
      const prerequisites = item.PreRequisites ?? [];
      prerequisites.forEach((prerequisite, index) => {
        const { nodes: preReqNodes, edges: preReqEdges } =
          generateNodesAndEdges(
            prerequisite,
            offsetX + spacingX * (index + 1),
            offsetY + spacingY
          );

        nodes.push(...preReqNodes);

        edges.push({
          id: `${item?.StudyPackageCd ?? 'defaultId'}-${
            prerequisite.StudyPackageCd ?? 'defaultTargetId'
          }`,
          source: item?.StudyPackageCd ?? 'defaultId',
          target: prerequisite.StudyPackageCd ?? 'defaultTargetId'
        });

        edges.push(...preReqEdges);
      });
    }

    if ('RelatedSPK' in item) {
      const relatedSPKs = item.RelatedSPK ?? [];
      relatedSPKs.forEach((spk, index) => {
        const { nodes: spkNodes, edges: spkEdges } = generateNodesAndEdges(
          spk,
          offsetX + spacingX * (index + 1),
          offsetY + 100
        );

        nodes.push(...spkNodes);

        edges.push({
          id: `${item?.StudyPackageCd ?? 'defaultId'}-${
            spk.StudyPackageCd ?? 'defaultTargetId'
          }`,
          source: item?.StudyPackageCd ?? 'defaultId',
          target: spk.StudyPackageCd ?? 'defaultTargetId'
        });

        edges.push(...spkEdges);
      });
    }

    return { nodes, edges };
  };

  const courseNode = {
    id: selectedCourse?.StudyPackageCd ?? 'defaultId',
    position: { x: 250, y: 0 },
    data: { label: selectedCourse?.FullTitle ?? 'defaultCourseTitle' }
  };

  let offsetX = 250;
  const offsetY = 100;

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
        id: `${courseNode.id}-${item.nodes[0].id}`,
        source: courseNode.id,
        target: item.nodes[0].id
      },
      ...item.edges
    );
  });

  spkNodesAndEdges?.forEach((item) => {
    nodes.push(...item.nodes);
    edges.push(
      {
        id: `${courseNode.id}-${item.nodes[0].id}`,
        source: courseNode.id,
        target: item.nodes[0].id
      },
      ...item.edges
    );
  });

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default ExploreCourses;
