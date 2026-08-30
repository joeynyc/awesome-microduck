# Awesome Microduck [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Software, simulators, policies, agent tools and coverage for Microduck, the $399 open-source biped robot from Pollen Robotics and Hugging Face.

Microduck is a 25 cm, ~800 g walking duck with 15 motors, a camera, an 8×8 ToF depth sensor, two IMUs and a grasping beak. Every behavior it ships with (walking, sit/stand, kicking, ground pick, roller-skating, self-recovery) is a neural policy trained in MuJoCo and exported to ONNX, and the full sim-to-real stack is Apache-2.0 on GitHub. Pre-orders opened on 27 August 2026; first units are expected before Christmas 2026.

*Microduck is a product of [Pollen Robotics](https://pollen-robotics.com) and Hugging Face. This is an independent, community-maintained list — not affiliated with, endorsed by, or sponsored by either company. Product names, logos and brands are the property of their respective owners, and every linked project belongs to its own authors under its own license.*

## Contents

- [Ecosystem Status](#ecosystem-status)
- [Official](#official)
- [Documentation](#documentation)
- [Simulation and Training](#simulation-and-training)
- [Policies and Skills](#policies-and-skills)
- [Agent Tools and MCP](#agent-tools-and-mcp)
- [Community Hubs and Registries](#community-hubs-and-registries)
- [Apps and Ports](#apps-and-ports)
- [Hardware and Fabrication](#hardware-and-fabrication)
- [Articles and Coverage](#articles-and-coverage)
- [Videos](#videos)
- [Community](#community)
- [Lineage](#lineage)

## Ecosystem Status

The robot is pre-hardware: pre-orders are open, shipping is targeted for December 2026, and almost nobody outside Pollen has a physical unit yet. That shapes what is real today:

**Simulation tools work now.** The official browser sandbox, `microduck_rl`, and everything built on the published ONNX policies can be run and verified without a robot.

**Hardware-facing tools are pre-validation.** MCP servers, gateways and CLIs that target the real `robotd` API are written against the published design docs and mock transports; none listed here has been exercised on a shipped unit.

**Policy distribution is not yet upstream.** Pollen's roadmap milestone M8 (“Model channel”) will let policies be published to the Hugging Face Hub and installed with `robotctl update apply`; until it ships, policies live inside the daemon build, and community policy catalogs are browse-only.

Entries marked *sim-only* have not been validated on hardware.

## Official

- [pollen-robotics/microduck](https://github.com/pollen-robotics/microduck) - The robot's software: `robotd` 50 Hz control loop, `mediad` camera/WebRTC, `padd` gamepad, updater, and the nine shipped ONNX policies.
- [pollen-robotics/microduck_rl](https://github.com/pollen-robotics/microduck_rl) - RL training environments on mjlab (MuJoCo Warp) with PPO, BAM actuator models, backlash simulation and domain randomization. Needs a CUDA GPU.
- [pollen-robotics/microduck-gst-plugins](https://github.com/pollen-robotics/microduck-gst-plugins) - Prebuilt aarch64 GStreamer plugins (Rockchip MPP encoders, gst-plugins-rs WebRTC) used by the on-robot media daemon.
- [Microduck Sandbox](https://huggingface.co/spaces/pollen-robotics/microduck-simulator) - Official in-browser simulator: MuJoCo compiled to WebAssembly plus onnxruntime-web running the real policies at 50 Hz, with gamepad support and the roller-skate variant.
- [Product page](https://pollen-robotics.com/microduck) - Specs, colorways and the launch story.
- [Store](https://store.pollen-robotics.com/products/microduck) - Pre-orders at $399.
- [Press kit](https://pollen-robotics.com/microduck/press-kit/) - Facts, full spec sheet, photos and downloads.
- [Meet Microduck](https://pollen-robotics.com/microduck/blog/introducing-microduck/) - Launch blog post from Pollen Robotics.

## Documentation

All from the `pollen-robotics/microduck` repository.

- [Docs index](https://github.com/pollen-robotics/microduck/blob/main/docs/README.md) - Map of every doc in the repo.
- [Cheat sheet](https://github.com/pollen-robotics/microduck/blob/main/docs/robot/cheatsheet.md) - `robotctl` commands for day-to-day use of the robot.
- [Architecture](https://github.com/pollen-robotics/microduck/blob/main/docs/design/architecture.md) - How the daemons, control loop, policies and updater fit together.
- [Design docs](https://github.com/pollen-robotics/microduck/tree/main/docs/design) - `robotd`, updater, remote WebRTC, boot recovery, restart order and the WebRTC console.
- [Roadmap](https://github.com/pollen-robotics/microduck/blob/main/docs/project/roadmap.md) - Milestones M1–M9, including the Hub model channel (M8) and autonomous brain (M9).
- [duckctl](https://github.com/pollen-robotics/microduck/blob/main/docs/robot/duckctl.md) - Controlling the robot from a laptop over Bluetooth.
- [Pair a gamepad](https://github.com/pollen-robotics/microduck/blob/main/docs/robot/pair-a-gamepad.md) - Bonding a controller to the robot.
- [Dev board setup](https://github.com/pollen-robotics/microduck/blob/main/docs/robot/install-dev.md) - Setting up a development board and pushing branches.
- [Contributing guide](https://github.com/pollen-robotics/microduck/blob/main/CONTRIBUTING.md) - Upstream contribution standards.

## Simulation and Training

- [microduck-rl-genesis](https://github.com/Macmachi/microduck-rl-genesis) - Genesis port of the walking task for AMD/ROCm GPUs, actuator model validated bit-exact against upstream. *Sim-only.*
- [Isaac Lab Microduck port](https://github.com/5usu/IsaacLab/blob/5usu/microduck-port/source/isaaclab_microduck/docs/README.md) - Isaac Lab extension with Microduck assets, BAM/backlash actuators and RSL-RL tasks for walking, kicking and parkour. *Sim-only.*
- [isaaclab-microduck](https://github.com/kabilankb/isaaclab-microduck) - Isaac Lab 3.0 (Newton MJWarp) port with locomotion, running, ball-kick and two-robot rally tasks, each A/B'd against the mjlab baseline. *Sim-only.*
- [microduck-lab](https://github.com/jvpflum/microduck-lab) - Reproducible training and evaluation workspace for NVIDIA DGX Spark that pins the official runtime, simulator and `microduck_rl` as submodules.
- [microduck-sim-playground](https://github.com/x10zyn/microduck-sim-playground) - Lightweight educational workspace: bootstrap script, CPU MuJoCo viewer with keyboard poses, upstream pinned as submodules.
- [microduck-rl-lab](https://github.com/AlexandreEDMOND/microduck-rl-lab) - Retrains five official skills and composes them into one automatic MuJoCo obstacle course. *Sim-only.*
- [microduck-miniverse](https://github.com/DollhouseRobotics/microduck-miniverse) - Every published ONNX policy repackaged as a deterministic Miniverse simulation bundle.

## Policies and Skills

Community-trained policies and task definitions built on `microduck_rl`.

- [microduck-backflip](https://github.com/Lulzx/microduck-backflip) - Reproducible mjlab backflip task with an evaluation battery, experiment log and explicit safety gates. *Sim-only.*
- [microduck-courier](https://github.com/selinayfilizp/microduck-courier) - Pick-carry-place task in an apartment scene with a trained policy, rollout clip and telemetry. *Sim-only.*
- [Jump playground](https://github.com/Liyucheng1997/318_lab-microduck-simulator) - Browser sandbox fork with a custom-trained vertical-jump policy; [live demo](https://duck.liyucheng.me). *Sim-only.*
- [microduck-sidekick-dance](https://github.com/pezzonovante7/microduck-sidekick-dance) - Drop-in mjlab task for a lateral dance step, with reward design notes. Task only, not yet trained.
- [nottyduck](https://github.com/reachjalil/nottyduck) - Desk-companion persona with trained gesture policies, a 3D office mapper and a Hugging Face Jobs training CLI; policies on the [Hub](https://huggingface.co/reachjalil/nottyduck-policies).
- [microduck-flamingo-cycle](https://huggingface.co/RemiFabre/microduck-flamingo-cycle) - One-legged flamingo pose policy on the Hugging Face Hub.
- [microduck-polite-bow](https://huggingface.co/fffiloni/microduck-polite-bow-b1d864) - Bow gesture policy on the Hugging Face Hub.
- [microduck-moonwalk-backward](https://huggingface.co/fffiloni/microduck-moonwalk-backward-55e6af) - Backward moonwalk gait on the Hugging Face Hub.

## Agent Tools and MCP

Ways for LLM agents and scripts to drive a duck.

- [joeynyc/microduck-mcp](https://github.com/joeynyc/microduck-mcp) - Agent-agnostic MCP server modeled on the real-robot `robotd` architecture: mock, MuJoCo sim, Unix-socket and SSH transports behind one tool set, with a safety layer. Hardware transports are pre-validation.
- [aj-dev-smith/microduck-mcp](https://github.com/aj-dev-smith/microduck-mcp) - MCP server driving the simulated duck (CPU MuJoCo with the official policies), with rendered camera frames as tool output and a live agent-experience debug page. *Sim-only.*
- [quackd](https://github.com/rokbenko/quackd) - LLM goal-planning daemon: describe a task in plain language and Claude, OpenAI, Gemini or Grok sequences the robot's existing skills. Bundled simulator, `.duck` task files, safety rules, MCP support, on PyPI.
- [meckie-duck-gateway](https://github.com/rangerchaz/meckie-duck-gateway) - Holds the robot's WebRTC/JSON-RPC session and re-exposes it as a small local HTTP API, with a hardware-free protocol double for testing.
- [OpenCastor Microduck integration](https://docs.opencastor.com/robots/microduck/) - Third-party robot-agent framework that discovers Microducks, sends intents through `robotd` and composes routines.
- [Strands Robots Microduck provider](https://strands-labs.github.io/robots/policies/microduck/) - Python/MuJoCo provider wrapping the shipped ONNX policies behind a common simulation and hardware interface.

## Community Hubs and Registries

- [MicroduckHub](https://microduckhub.com) - Community policy browser listing the shipped behaviors and Hub retrains, with one-click deploy planned for when upstream's model channel ships.
- [uDuck Registry](https://uduck-registry.pages.dev) - Independent catalog of community policy descriptors with contract specs and verification status.

## Apps and Ports

- [DuckKit](https://github.com/craigm26/duckkit) - The Microduck as a pure Swift package: runs the real ONNX policies with the real 61-float observation at 50 Hz, plus kinematics, protocol types and Linux tests.
- [microduck-sim (iPhone)](https://github.com/littlejohntj/microduck-sim) - The nine shipped policies plus MuJoCo running natively on iPhone in Swift/RealityKit, with an AR mode at true scale.
- [Microduck AR](https://huggingface.co/spaces/multimodalart/microduck-ar) - WebXR adaptation of the official sandbox with AR placement and ground-pick interaction.
- [specs-microduck](https://github.com/kgediya/specs-microduck) - Hand-gesture teleoperation of the simulated duck from Snap Spectacles, with in-lens telemetry.
- [MicroDuckModels](https://github.com/IronSpiderMan/MicroDuckModels) - Browser simulator rebuilt on Three.js and React Three Fiber with MuJoCo WebAssembly physics and local ONNX inference, running all nine shipped policies. Readme in Chinese and English.
- [microquack](https://osolmaz.github.io/microquack/) - Procedural droid-voice synthesis for the duck: a Rust core rendered live in the browser via WebAssembly, also on [Hugging Face](https://huggingface.co/spaces/osolmaz/microquack).

## Hardware and Fabrication

The hardware is not open source (no BOM, CAD or PCB files), but the MJCF and STL meshes are public.

- [microduck-replica](https://github.com/fanhao375/microduck-replica) - Mechanical reconstruction study: assembly and exploded drawings and CAD-importable assemblies derived from the public MJCF/STL model. In Chinese.

## Articles and Coverage

- [TechCrunch](https://techcrunch.com/2026/08/27/hugging-face-is-selling-a-cute-399-open-source-duck-robot-microduck/) - Launch coverage.
- [Engadget](https://www.engadget.com/2245407/huggingface-and-pollen-robotics-opn-pre-orders-for-the-microduck-robot/) - Pre-order details and specs.
- [The Register](https://www.theregister.com/ai-and-ml/2026/08/27/hugging-face-offers-399-robot-duck-to-help-you-quack-the-ai-code/5293011) - Launch coverage with a developer angle.
- [The New Stack](https://thenewstack.io/hugging-face-microduck-robot/) - Why the duck is a reinforcement-learning teaching platform.
- [IEEE Spectrum](https://spectrum.ieee.org/video-friday-microduck-robot) - Video Friday feature.
- [Digital Trends](https://www.digitaltrends.com/cool-tech/pollen-robotics-microduck-aims-to-make-training-physical-ai-far-less-fragile-and-cheaper/) - On making physical-AI training cheaper and less fragile.
- [MarkTechPost](https://www.marktechpost.com/2026/08/28/pollen-robotics-hugging-face-microduck-399-open-source-rl-biped-robot/) - Technical summary of the RL stack.
- [Interesting Engineering](https://interestingengineering.com/ai-robotics/new-robot-duck-learn-from-its-mistakes) - Overview of the robot's fall recovery and learning loop.
- [Hacker News discussion](https://news.ycombinator.com/item?id=49462763) - Launch thread with 700+ points, including Pollen engineers answering questions.

## Videos

- [We made a new robot.](https://www.youtube.com/watch?v=RAtzEyGBGFU) - Official launch film from Pollen Robotics.
- [Meet Microduck, the $399 Tiny Robot You Can Teach New Tricks](https://www.youtube.com/watch?v=reiTh7K4KSc) - Official product overview.
- [Microduck Sim 2 Real](https://www.youtube.com/watch?v=szW7N_7B3tU) - Official side-by-side of policies in simulation and on the robot.
- [Hugging Face Pushes Deeper Into Robotics With MicroDuck](https://www.youtube.com/watch?v=LF7GmLKgvcc) - Bloomberg Tech segment.
- ['Microduck' robot enters growing market of AI toys](https://www.youtube.com/watch?v=i_IMO0knP3I) - Global News segment.

## Community

- [Pollen Discord](https://discord.com/invite/pollen-community-519098054377340948) - Official community server; the Microduck channels are where the team answers questions.
- [Pollen Robotics on Hugging Face](https://huggingface.co/pollen-robotics) - Organization page hosting the sandbox Space and models.
- [Pollen Robotics on YouTube](https://www.youtube.com/@PollenRobotics) - Official channel.
- [@pollenrobotics on X](https://x.com/pollenrobotics) - Official account.

## Lineage

Microduck grew out of Open Duck Mini, Antoine Pirrone's open-hardware BDX-style droid, and the Open Duck community still shares Discord space, actuator models and sim-to-real lessons with it.

- [Open Duck Mini](https://github.com/apirrone/Open_Duck_Mini) - The open-hardware predecessor: BOM, CAD, and the original mjlab training work.
- [Open Duck Mini Runtime](https://github.com/apirrone/Open_Duck_Mini_Runtime) - Raspberry Pi runtime for Open Duck Mini.
- [microduck_runtime (legacy)](https://github.com/TommyZihao/microduck_runtime) - Pre-launch Raspberry Pi runtime for the Microduck prototype; superseded by `pollen-robotics/microduck`.

## Contributing

Contributions welcome! Read the [contribution guidelines](contributing.md) first.
