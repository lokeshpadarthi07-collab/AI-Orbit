import React, { useState } from 'react';
import { X, Bot, Cpu, Zap, Activity, ShieldCheck, Play } from 'lucide-react';

export default function RobotDetailModal({ robot, onClose, showToast }) {
  if (!robot) return null;

  const [isSimulating, setIsSimulating] = useState(false);
  const [telemetryLog, setTelemetryLog] = useState([]);

  const handleRunKinematics = () => {
    setIsSimulating(true);
    setTelemetryLog([
      `[0.0s] Initializing ${robot.name} Joint Actuator Bus...`,
      `[0.2s] Calibrating 6-axis IMU & spatial LiDAR sensors...`,
      `[0.4s] Deploying ${robot.aiBrain} neural weight policy...`,
      `[0.8s] Standing posture balance established. Joint Torque: 120 Nm.`,
      `[1.2s] Kinematic trajectory verified at 60Hz loop rate.`
    ]);
    setTimeout(() => {
      setIsSimulating(false);
      if (showToast) showToast(`Kinematic simulation completed for ${robot.name}!`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl border border-cyan-500/30 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-cyan-400" />
            <h3 className="font-heading text-lg font-bold text-white">{robot.name} Kinematic Telemetry</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img src={robot.image} alt={robot.name} className="h-48 w-full md:w-64 rounded-xl object-cover border border-zinc-800" />
            
            <div className="flex-1 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{robot.maker}</span>
              <h2 className="font-heading text-2xl font-bold text-white">{robot.name}</h2>
              <p className="text-xs text-zinc-300 leading-relaxed">{robot.description}</p>
              
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-mono font-bold text-cyan-300 border border-cyan-500/30">
                <span>Status: {robot.status}</span>
              </div>
            </div>
          </div>

          {/* Actuator & Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="text-zinc-500 text-[10px]">Height</div>
              <div className="font-bold text-white mt-0.5">{robot.height}</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="text-zinc-500 text-[10px]">Weight</div>
              <div className="font-bold text-white mt-0.5">{robot.weight}</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="text-zinc-500 text-[10px]">Degrees of Freedom</div>
              <div className="font-bold text-cyan-400 mt-0.5">{robot.degreesOfFreedom} DoF</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="text-zinc-500 text-[10px]">Payload Capacity</div>
              <div className="font-bold text-emerald-400 mt-0.5">{robot.payload}</div>
            </div>
          </div>

          {/* Neural Brain Stack */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h4 className="text-xs font-bold text-zinc-300 mb-1">Spatial VLM & Embodied Brain Architecture:</h4>
            <div className="font-mono text-xs text-purple-300">{robot.aiBrain}</div>
          </div>

          {/* Simulation Button */}
          <button
            onClick={handleRunKinematics}
            disabled={isSimulating}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 text-xs font-bold text-white shadow-glow-cyan hover:bg-cyan-500"
          >
            {isSimulating ? (
              <span>Simulating Joint Actuators...</span>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Run Physical Kinematics Simulation</span>
              </>
            )}
          </button>

          {/* Telemetry Console */}
          {telemetryLog.length > 0 && (
            <div className="rounded-xl border border-zinc-800 bg-black p-4 font-mono text-xs text-emerald-400 space-y-1">
              <div className="text-zinc-500 text-[10px] uppercase font-bold mb-2">Kinematic Loop Output:</div>
              {telemetryLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
