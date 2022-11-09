import Canvas from './components/Canvas';
import './App.css';
import { useRef, useState } from 'react';
import Menu from './components/Menu';
import { AppContext } from './AppContext';
import useForceRerender from './hooks/useForceRerender';
import useError from './hooks/useError';
import useObjectData from './hooks/useObjectData';
import { CalculationMode, Point3D } from './types';
import useParams from './hooks/useParams';
import useSupportsOffscreenCanvas from './hooks/useSupportsOffscreenCanvas';

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const { forceRerender } = useForceRerender();
  const { showError, errorText, setErrorText } = useError();
  const { objectData, readFile } = useObjectData();
  const { params, paramSetters } = useParams();
  const supportsOffscreenCanvas = useSupportsOffscreenCanvas(setErrorText);

  const [lightPosition, _setLightPosition] = useState<Point3D>({
    x: 0.8,
    y: 1,
    z: 2,
  });

  const [calculationMode, setCalculationMode] = useState<CalculationMode>(
    CalculationMode.InterpolateColor
  );

  const [currentFps, setCurrentFps] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        setErrorText,
        forceRerender,
        objectData,
        readFile,
        lightPosition,
        params,
        paramSetters,
        calculationMode,
        setCalculationMode,
        supportsOffscreenCanvas,
        currentFps,
        setCurrentFps,
      }}
    >
      <div className='App'>
        <Menu />
        <div className='canvas-container' ref={canvasContainerRef}>
          <Canvas />
        </div>
      </div>
      <div className={`alert ${showError ? 'show' : ''}`}>
        <div className='alert-icon'>⚠️</div>
        <div>{errorText}</div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
