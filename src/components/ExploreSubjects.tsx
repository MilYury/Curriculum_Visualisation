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

const ExploreSubjects: React.FC = () => {
  const selectedSubject = useSelector(
    (state: RootState) => state.subjects.selectedData
  );

  const generateNodesAndEdges = (
    subject: ISubject | undefined,
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
        offsetY + 100 * (index + 1)
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

  const { nodes, edges } = generateNodesAndEdges(selectedSubject, 250, 0);

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

export default ExploreSubjects;
