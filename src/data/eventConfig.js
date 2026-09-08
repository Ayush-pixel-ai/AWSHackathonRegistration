export const EVENT_CONFIG = {
  eventName: 'NEXUS HACK 2026',
  tagline: '36-Hour Global AI & Cloud Innovation Summit',
  dateString: 'October 24 - 26, 2026',
  targetStartDate: '2026-10-24T09:00:00Z',
  location: 'Palace of Fine Arts, San Francisco, CA & Global Virtual Stream',
  venueAddress: '3301 Lyon St, San Francisco, CA 94123',
  prizePool: '$150,000 USD',
  rulesUrl: '#',
  sponsorList: ['NVIDIA', 'AWS', 'Google Cloud', 'OpenAI', 'Vercel']
};

export const INITIAL_TRACKS = [
  {
    id: 'ai-ml',
    name: 'AI & Neural Systems',
    description: 'LLM agents, multimodal pipelines, edge neural inference & autonomous decision loops.',
    iconName: 'BrainCircuit',
    totalSeats: 50,
    seatsLeft: 14,
    tags: ['PyTorch', 'LangChain', 'TensorFlow', 'CUDA'],
    accentColor: 'cyan'
  },
  {
    id: 'cloud-arch',
    name: 'Cloud Architecture & Infra',
    description: 'Kubernetes mesh, zero-downtime microservices, serverless scale & high-concurrency systems.',
    iconName: 'Cloud',
    totalSeats: 40,
    seatsLeft: 6, // Filling fast
    tags: ['AWS', 'Kubernetes', 'Go', 'Terraform'],
    accentColor: 'indigo'
  },
  {
    id: 'web3-crypto',
    name: 'Web3 & Decentralized Protocols',
    description: 'Zero-knowledge proofs, smart contract security, cross-chain messaging & decentralized identity.',
    iconName: 'Blocks',
    totalSeats: 60,
    seatsLeft: 28,
    tags: ['Solidity', 'Rust', 'EVM', 'ZK-Proofs'],
    accentColor: 'purple'
  },
  {
    id: 'cybersecurity',
    name: 'Zero-Trust Cybersecurity',
    description: 'Threat hunting, binary analysis, post-quantum cryptography & offensive/defensive security ops.',
    iconName: 'ShieldAlert',
    totalSeats: 45,
    seatsLeft: 11,
    tags: ['Python', 'Ghidra', 'Network Security', 'Cryptography'],
    accentColor: 'emerald'
  },
  {
    id: 'robotics-iot',
    name: 'Autonomous Robotics & IoT',
    description: 'ROS2 navigation, embedded RTOS, drone telemetry & physical computing hardware hacks.',
    iconName: 'Bot',
    totalSeats: 35,
    seatsLeft: 3, // Low seats alert!
    tags: ['C++', 'ROS2', 'ESP32', 'Raspberry Pi'],
    accentColor: 'amber'
  }
];

export const INITIAL_ATTENDEES = [
  {
    ticketId: 'NEXUS-2026-A891',
    fullName: 'Sophia Chen',
    email: 'sophia.chen@mit.edu',
    organization: 'MIT AI Lab',
    trackId: 'ai-ml',
    trackName: 'AI & Neural Systems',
    registeredAt: '2026-08-20T10:15:00.000Z'
  },
  {
    ticketId: 'NEXUS-2026-B402',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@stanford.edu',
    organization: 'Stanford Distributed Labs',
    trackId: 'cloud-arch',
    trackName: 'Cloud Architecture & Infra',
    registeredAt: '2026-08-22T14:30:00.000Z'
  }
];
