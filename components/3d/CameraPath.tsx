/**
 * CameraPath - Smooth camera animation along spline
 *
 * Features:
 * - CatmullRomCurve3 for smooth path
 * - Scroll-driven camera position
 * - Look-at target following DNA helix
 */

'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface CameraPathProps {
  points?: THREE.Vector3[];
  tension?: number;
}

export function CameraPath({
  points,
  tension = 0.5,
}: CameraPathProps) {
  const { camera } = useThree();
  const scroll = useScroll();
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Create smooth camera path using CatmullRomCurve3
  const cameraPath = useMemo(() => {
    const defaultPoints = [
      new THREE.Vector3(8, 2, 8),   // Start position
      new THREE.Vector3(5, 4, 10),  // Mid-high
      new THREE.Vector3(0, 6, 12),  // Top center
      new THREE.Vector3(-5, 4, 10), // Mid-high opposite
      new THREE.Vector3(-8, 2, 8),  // End position
    ];

    const pathPoints = points || defaultPoints;
    return new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', tension);
  }, [points, tension]);

  // Animate camera along path
  useFrame(() => {
    const scrollOffset = scroll.offset;

    // Get camera position from curve
    const cameraPosition = cameraPath.getPoint(scrollOffset);
    camera.position.copy(cameraPosition);

    // Update look-at target - follow scroll with smooth interpolation
    const targetY = (scrollOffset - 0.5) * 5;
    lookAtTarget.current.y = THREE.MathUtils.lerp(
      lookAtTarget.current.y,
      targetY,
      0.05
    );

    camera.lookAt(lookAtTarget.current);
  });

  return null;
}
