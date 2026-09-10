import React from 'react';
import { Bot, Cpu, Zap, ShieldCheck } from 'lucide-react';

export default function RobotsModule({ robots, onSelectRobot }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Robotics & Physical AI Hardware
          </h2>
          <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
            Embodied AI Index
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Directory of bipedal humanoid robots, physical AI agents, spatial actuators, and spatial intelligence platforms.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {robots.map((bot) => (
          <div
            key={bot.id}
            className="orbit-glass orbit-glass-hover rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer"
            onClick={() => onSelectRobot && onSelectRobot(bot)}
          >
            <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
              <img src={bot.image} alt={bot.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
              <span className="absolute top-3 right-3 rounded-full bg-cyan-500/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/40">
                {bot.status}
              </span>
            </div>

            <div className="p-5">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{bot.maker}</div>
              <h3 className="font-heading text-xl font-bold text-white mt-0.5">{bot.name}</h3>
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed">{bot.description}</p>

              {/* Hardware Specs Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-500 block text-[10px]">Height / Weight</span>
                  <span className="font-semibold text-zinc-200">{bot.height} / {bot.weight}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">Degrees of Freedom</span>
                  <span className="font-semibold text-cyan-400">{bot.degreesOfFreedom} DoF</span>
                </div>
                <div className="col-span-2 mt-1 pt-1 border-t border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">AI Brain & VLM Stack</span>
                  <span className="font-mono text-purple-300">{bot.aiBrain}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button className="w-full rounded-xl bg-zinc-900 py-2 text-xs font-semibold text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all">
                Inspect Specs & Kinematics
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
