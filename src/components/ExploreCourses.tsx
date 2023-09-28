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

interface INodeEdges {
  nodes: any[];
  edges: any[];
}

const ExploreCourses: React.FC = () => {
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  const generateNodesAndEdges = (
    subject: ISubject,
    offsetX: number,
    offsetY: number
  ): INodeEdges => {
    const nodes = [];
    const edges: Array<{ id: string; source: string; target: string }> = [];

    const prerequisites = subject?.PreRequisites ?? [];

    nodes.push({
      id: subject?.StudyPackageCd ?? 'defaultId',
      position: { x: offsetX, y: offsetY },
      data: { label: subject?.FullTitle ?? 'defaultTitle' }
    });

    prerequisites.forEach((prerequisite, index) => {
      const { nodes: preReqNodes, edges: preReqEdges } = generateNodesAndEdges(
        prerequisite,
        offsetX + 250 * (index + 1),
        offsetY + 100
      );

      nodes.push(...preReqNodes);

      edges.push({
        id: `${subject?.StudyPackageCd ?? 'defaultId'}-${
          prerequisite.StudyPackageCd ?? 'defaultTargetId'
        }`,
        source: subject?.StudyPackageCd ?? 'defaultId',
        target: prerequisite.StudyPackageCd ?? 'defaultTargetId'
      });

      edges.push(...preReqEdges);
    });

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
