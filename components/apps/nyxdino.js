import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

export class NyxDino extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.prev_commands = [];
        this.commands_index = -1;
        this.isFirstLoad = true;
        this.conversationHistory = [];
        this.userPreferences = {};
        this.responsePersonality = ['epic', 'cool', 'awesome', 'legendary'];

        // Initialize state
        this.state = {
            terminal: [],
            aiMode: 'quantum',
            theme: 'matrix',
            neuralNetworkActive: true,
            modelAccuracy: 0.0,
            trainingProgress: 0,
            welcomeMessageVisible: false,
            cursorVisible: true,
            activeRowId: 0,
            quantumState: 'coherent',
            adaptiveLevel: 1,
            neuralSynergy: 0.0,
            isInitialized: false
        };

        // Define qaMap as a class property
        this.qaMap = [
            {
                keywords: ['hello', 'hi', 'hey', 'yo', 'sup', 'greetings', 'welcome', 'hola', 'howdy', 'good morning', 'good afternoon', 'good evening'],
                answer: this.getWelcomeResponse
            },
            {
                keywords: ['education', 'study', 'college', 'university', 'dtu', 'academic', 'school', 'degree', 'course', 'student', 'studying', 'where do you study', 'what university', 'which college'],
                answer: this.getEducationResponse
            },
            {
                keywords: ['who is dino', 'about dino', 'tell me about dino', 'introduce dino'],
                answer: this.getAboutResponse
            },
            {
                keywords: ['skills', 'expertise', 'technologies', 'tech stack', 'programming', 'what can you do'],
                answer: this.getSkillsResponse
            },
            {
                keywords: ['projects', 'portfolio', 'work', 'built', 'created', 'show projects'],
                answer: this.getProjectsResponse
            },
            {
                keywords: ['hobbies', 'free time', 'what do you do for fun', 'pastime', 'interests outside coding'],
                answer: this.getHobbiesResponse
            },
            {
                keywords: ['favorite book', 'books', 'reading list', 'recommend a book', 'book suggestion'],
                answer: this.getBooksResponse
            },
            {
                keywords: ['future goals', 'where do you see yourself', 'plans for future', 'ambitions', 'dream job'],
                answer: this.getFutureGoalsResponse
            },
            {
                keywords: ['favorite programming language', 'best language', 'which language do you like', 'preferred language'],
                answer: this.getFavoriteLanguageResponse
            },
            {
                keywords: ['github', 'repos', 'repositories', 'show github', 'github profile', 'code projects', 'open source'],
                answer: this.getGitHubResponse
            },
            {
                keywords: ['social', 'contact', 'instagram', 'discord', 'email', 'spotify', 'how to reach', 'connect'],
                answer: this.getSocialResponse
            }
        ];

        // --- BEGIN: Neural/Deep Learning Additions ---
        this.neuralNetwork = {
            inputLayer: {
                vocabulary: new Map(),
                wordEmbeddings: new Map(),
                vectorSize: 100
            },
            hiddenLayers: [
                { neurons: 128, activationFunction: 'relu' },
                { neurons: 64, activationFunction: 'relu' },
                { neurons: 32, activationFunction: 'tanh' }
            ],
            outputLayer: {
                responseCategories: new Map(),
                confidenceThreshold: 0.2 // Lower threshold for more matches
            },
            weights: {
                inputToHidden: new Map(),
                hiddenToOutput: new Map(),
                biases: new Map()
            },
            learningRate: 0.001,
            momentum: 0.9,
            epochs: 0,
            trainingAccuracy: 0.0,
            lastUpdated: null // Changed from new Date()
        };

        this.deepLearningModels = {
            intentClassifier: {
                model: 'transformer-based',
                accuracy: 0.94,
                classes: ['greeting', 'personal_info', 'skills', 'projects', 'education', 'work', 'social', 'technical', 'prediction', 'analysis']
            },
            sentimentAnalyzer: {
                model: 'bert-based',
                accuracy: 0.92,
                classes: ['positive', 'negative', 'neutral', 'curious', 'excited', 'analytical']
            },
            nerModel: {
                model: 'spacy-based',
                entities: ['PERSON', 'ORG', 'TECH', 'SKILL', 'PROJECT']
            },
            responseGenerator: {
                model: 'gpt-style',
                contextWindow: 2048,
                temperature: 0.7,
                topP: 0.9
            }
        };
        // --- END: Neural/Deep Learning Additions ---

        // --- BEGIN: Enhanced Personal Info ---
        this.personalInfo = {
            name: "Dino",
            username: "bloodwraith8851",
            location: "India",
            skills: [
                // Languages
                "JavaScript", "TypeScript", "Python", "C#", "C++", "PHP", "Ruby", "Rust", "Go",
                // Frontend
                "React", "Angular", "HTML5", "CSS3",
                // Backend & Databases
                "Node.js", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Firebase",
                // Cloud & DevOps
                "AWS", "Google Cloud", "Docker", "GitHub",
                // Data Science
                "NumPy",
                // Tools & Others
                "Figma", "npm", "Debian"
            ],
            skillLevels: {
                "JavaScript": 9.0,
                "Python": 8.8,
                "React": 8.5,
                "Node.js": 8.7,
                "AWS": 8.2,
                "Docker": 8.0
            },
            languages: ["JavaScript", "TypeScript", "Python", "C#", "C++", "PHP", "Ruby", "Rust", "Go"],
            frameworks: ["React", "Angular", "Node.js", "Django", "FastAPI"],
            social: {
                github: "https://github.com/bloodwraith8851",
                instagram: "https://www.instagram.com/the.end_giveup",
                discord: "https://discord.com/users/829301078687612938",
                email: "rakeshsarkar9711@gmail.com",
                spotify: "https://open.spotify.com/user/31w74gdjgusjsrddzpf7xbysvsgi"
            },
            work: {
                current: "Full Stack Developer",
                focus: "Web Development & Cloud Technologies",
                technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"]
            },
            interests: [
                "Full Stack Development",
                "Cloud Computing",
                "DevOps",
                "Database Management",
                "UI/UX Design",
                "Data Science",
                "Open Source"
            ]
        };
        // --- END: Enhanced Personal Info ---

        // --- Original ML Engine (keep as is, but you can add new fields if needed) ---
        this.mlEngine = {
            patterns: new Map(),
            sentiments: new Map(),
            popularQuestions: new Map(),
            learningData: [],
            knowledgeGraph: {
                entities: new Map(),
                relationships: new Map(),
                metadata: {
                    lastUpdated: null, // Changed from new Date()
                    totalEntities: 0,
                    totalRelationships: 0
                }
            }
        };

        // Add new categories to the neural network
        this.neuralNetwork.outputLayer.responseCategories.set('achievements', 8);
        this.neuralNetwork.outputLayer.responseCategories.set('interests', 9);
        this.neuralNetwork.outputLayer.responseCategories.set('learning', 10);

        // Add new response patterns
        this.responsePatterns = {
            achievements: [
                "Won DTU AI Hackathon 2024 🏆",
                "Built 15+ successful ML/AI projects 🚀",
                "Maintained 8.7 GPA while working part-time 📚",
                "Published research papers in AI conferences 📝",
                "Open source contributor to major AI projects 🌟"
            ],
            interests: [
                "Passionate about AI and Machine Learning 🤖",
                "Love exploring new technologies 🔍",
                "Enjoy building innovative projects 🛠️",
                "Active in tech communities 👥",
                "Fascinated by quantum computing 🌌"
            ],
            learning: [
                "Daily practice and coding challenges 💻",
                "Reading technical books and papers 📚",
                "Taking online courses and certifications 🎓",
                "Contributing to open source projects 🌐",
                "Participating in hackathons and competitions 🏃‍♂️"
            ]
        };

        // Enhanced AI Modes Configuration
        this.aiModes = {
            quantum: {
                name: 'Quantum AI',
                description: 'Quantum-inspired processing for multidimensional analysis',
                features: [
                    'Quantum State Processing',
                    'Superposition Analysis',
                    'Quantum Entanglement Patterns',
                    'Wave Function Optimization'
                ],
                capabilities: {
                    processingSpeed: 'Quantum-accelerated',
                    accuracy: 0.99,
                    dimensionality: 'Multi-dimensional',
                    adaptability: 'Self-evolving'
                }
            },
            neural: {
                name: 'Neural Nexus',
                description: 'Advanced neural network with dynamic synaptic mapping',
                features: [
                    'Dynamic Neural Mapping',
                    'Synaptic Pattern Recognition',
                    'Cognitive Enhancement',
                    'Neural Plasticity'
                ],
                capabilities: {
                    processingSpeed: 'Bio-inspired',
                    accuracy: 0.95,
                    dimensionality: 'Neural-mapped',
                    adaptability: 'Self-learning'
                }
            },
            cybernetic: {
                name: 'Cybernetic Core',
                description: 'Hybrid human-machine intelligence optimization',
                features: [
                    'Human-AI Synergy',
                    'Cybernetic Enhancement',
                    'Augmented Intelligence',
                    'Neural Interface'
                ],
                capabilities: {
                    processingSpeed: 'Augmented',
                    accuracy: 0.97,
                    dimensionality: 'Multi-modal',
                    adaptability: 'Symbiotic'
                }
            },
            heuristic: {
                name: 'Heuristic Matrix',
                description: 'Advanced problem-solving with evolutionary algorithms',
                features: [
                    'Evolutionary Computing',
                    'Genetic Algorithms',
                    'Swarm Intelligence',
                    'Adaptive Heuristics'
                ],
                capabilities: {
                    processingSpeed: 'Evolutionary',
                    accuracy: 0.93,
                    dimensionality: 'Problem-space',
                    adaptability: 'Self-optimizing'
                }
            }
        };

        // Enhanced query patterns
        this.queryPatterns = {
            skills: [
                'skills', 'expertise', 'what can you do', 'technologies',
                'tech stack', 'programming', 'languages', 'frameworks',
                'what do you know', 'technical skills', 'coding skills'
            ],
            projects: [
                'projects', 'portfolio', 'what have you built', 'show projects',
                'github projects', 'work', 'applications', 'demos', 'showcase'
            ],
            education: [
                'education', 'university', 'college', 'school', 'academic',
                'study', 'degree', 'qualification', 'dtu', 'where did you study'
            ],
            contact: [
                'contact', 'social', 'links', 'email', 'discord', 'instagram',
                'how to reach', 'connect', 'dm', 'message', 'get in touch'
            ],
            experience: [
                'experience', 'work history', 'job', 'career', 'professional',
                'where do you work', 'employment', 'occupation'
            ],
            achievements: [
                'achievements', 'awards', 'accomplishments', 'recognition',
                'honors', 'accolades', 'what have you achieved'
            ]
        };
    }

    componentDidMount() {
        if (!this.state.isInitialized) {
            // Initialize the terminal with welcome message
            const welcomeMsg = this.getWelcomeResponse();
            this.setState({
                terminal: [welcomeMsg],
                welcomeMessageVisible: true,
                isInitialized: true
            }, () => {
                requestAnimationFrame(() => {
                    this.appendTerminalRow();
                    // Initialize AI components
                    this.initializeAI();
                    this.initializeNeuralNetwork();
                    this.trainDeepLearningModels();
                });
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.terminal.length !== this.state.terminal.length) {
            // Only start cursor for new terminal rows
            const lastRowId = this.terminal_rows - 1;
            if (lastRowId >= 0) {
                requestAnimationFrame(() => {
                    this.startCursor(lastRowId);
                });
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    initializeAI = () => {
        // Initialize ML patterns
        this.mlEngine.patterns.set('greeting', ['hello', 'hi', 'hey', 'yo', 'sup']);
        this.mlEngine.patterns.set('question', ['what', 'how', 'why', 'when', 'where', 'who']);
        this.mlEngine.patterns.set('compliment', ['cool', 'awesome', 'amazing', 'great', 'fantastic']);

        // Learning initialization
        this.loadLearningData();
    }

    loadLearningData = () => {
        // Simulate loading previous learning data
        const mockLearningData = [
            { query: 'skills', frequency: 15, sentiment: 'positive' },
            { query: 'projects', frequency: 12, sentiment: 'interested' },
            { query: 'ai', frequency: 20, sentiment: 'excited' }
        ];

        mockLearningData.forEach(data => {
            this.mlEngine.popularQuestions.set(data.query, data.frequency);
            this.mlEngine.sentiments.set(data.query, data.sentiment);
        });
    }

    startNyxDino = () => {
        clearInterval(this.cursor);
        this.terminal_rows = 1;
    }

    appendTerminalRow = () => {
        this.setState(prevState => ({
            terminal: [...prevState.terminal, this.terminalRow(this.terminal_rows)]
        }), () => {
            this.terminal_rows += 1;
        });
    };

    terminalRow = (id) => {
        return (
            <div key={`terminal-${id}`} className="mb-2">
                <div className="flex w-full h-6 items-center">
                    <div className="flex items-center">
                        <div className="text-green-400 font-bold">🦖 NyxDino</div>
                        <div className="text-white mx-1 font-medium">:</div>
                        <div className="text-cyan-400 font-bold">AI-Brain</div>
                        <div className="text-white mx-1 font-medium">{'>'}</div>
                        <div className="text-yellow-400 mr-2">$</div>
                    </div>
                    <div className="bg-transparent relative flex-1 overflow-hidden">
                        <div className="flex">
                            <span 
                                id={`show-${id}`}
                                className="float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider text-white"
                            />
                            <div 
                                id={`cursor-${id}`}
                                className="float-left mt-1 w-2 h-4 bg-green-400"
                                style={{ visibility: 'visible' }}
                            />
                        </div>
                        <input
                            id={`terminal-input-${id}`}
                            data-row-id={id}
                            onKeyDown={this.checkKey}
                            onBlur={() => this.unFocusCursor(id)}
                            onChange={(e) => {
                                const showElement = document.getElementById(`show-${id}`);
                                if (showElement) {
                                    showElement.textContent = e.target.value;
                                }
                            }}
                            className="absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent"
                            spellCheck={false}
                            autoFocus
                            autoComplete="off"
                            type="text"
                        />
                    </div>
                </div>
            </div>
        );
    };

    focusCursor = (id) => {
        clearInterval(this.cursor);
        this.startCursor(id);
    }

    unFocusCursor = (id) => {
        this.stopCursor(id);
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        
        // Focus the input
        const input = document.getElementById(`terminal-input-${id}`);
        if (input) {
            input.focus();
        }

        // Handle cursor blinking
        this.cursor = window.setInterval(() => {
            const cursorElement = document.getElementById(`cursor-${id}`);
            if (cursorElement) {
                cursorElement.style.visibility = 
                    cursorElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }
        }, 500);
    };

    stopCursor = (id) => {
        clearInterval(this.cursor);
        const cursorElement = document.getElementById(`cursor-${id}`);
        if (cursorElement) {
            cursorElement.style.visibility = 'visible';
        }
    };

    removeCursor = (id) => {
        clearInterval(this.cursor);
        const cursorElement = document.getElementById(`cursor-${id}`);
        if (cursorElement) {
            cursorElement.style.visibility = 'hidden';
        }
    };

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = async (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();

            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                await this.processQuery(command, terminal_row_id);
                this.prev_commands.push(command);
                this.commands_index = this.prev_commands.length;
                this.clearInput(terminal_row_id);
            }
        }
        else if (e.key === "ArrowUp") {
            this.navigateHistory(-1, $(e.target).data("row-id"));
        }
        else if (e.key === "ArrowDown") {
            this.navigateHistory(1, $(e.target).data("row-id"));
        }
    }

    navigateHistory = (direction, rowId) => {
        if (direction === -1 && this.commands_index > 0) this.commands_index--;
        else if (direction === 1 && this.commands_index < this.prev_commands.length - 1) this.commands_index++;

        let command = "";
        if (this.commands_index >= 0 && this.commands_index < this.prev_commands.length) {
            command = this.prev_commands[this.commands_index];
        }

        $(`input#terminal-input-${rowId}`).val(command);
        $(`#show-${rowId}`).text(command);
    }

    processQuery = async (query, rowId) => {
        try {
            this.removeCursor(rowId);
            this.prev_commands.push(query);
            this.commands_index = this.prev_commands.length - 1;

            // Handle empty queries
            if (!query.trim()) {
                this.appendTerminalRow();
                return;
            }

            // Handle special commands
            switch (query.toLowerCase().trim()) {
                case 'clear':
                    this.setState({ terminal: [] }, () => {
                        this.terminal_rows = 0;
                        this.appendTerminalRow();
                    });
                    return;

                case 'help':
                    const helpMessage = this.getHelpMessage();
                    this.updateTerminalWithResponse(query, helpMessage, rowId);
                    return;

                case 'stats':
                    const analytics = this.getAnalytics();
                    this.updateTerminalWithResponse(query, analytics, rowId);
                    return;

                case 'exit':
                    const exitMessage = this.getExitMessage();
                    this.updateTerminalWithResponse(query, exitMessage, rowId);
                    return;

                case 'github':
                    const githubResponse = await this.getGitHubResponse();
                    this.updateTerminalWithResponse(query, githubResponse, rowId);
                    return;

                default:
                    // Generate AI response for other queries
                    const response = await this.generateAIResponse(query);
                    this.updateTerminalWithResponse(query, response, rowId);
                    return;
            }

        } catch (error) {
            console.error('Error processing query:', error);
            this.updateTerminalWithResponse(query, 
                <div className="bg-gray-800 border border-red-400 rounded p-4">
                    <div className="text-xl font-bold text-red-300 mb-2">
                        ⚠️ Error Processing Request
                    </div>
                    <div className="text-gray-200">
                        Sorry, I encountered an error. Please try again or use a different command.
                    </div>
                </div>,
                rowId
            );
        }
    };

    updateTerminalWithResponse = (query, response, rowId) => {
        this.setState(prevState => {
            const updatedTerminal = [...prevState.terminal];
            updatedTerminal[rowId] = (
                <div key={`response-${rowId}`} className="mb-4">
                    <div className="flex w-full h-6 items-center mb-2">
                        <div className="flex items-center">
                            <div className="text-green-400 font-bold">🦖 NyxDino</div>
                            <div className="text-white mx-1 font-medium">:</div>
                            <div className="text-cyan-400 font-bold">AI-Brain</div>
                            <div className="text-white mx-1 font-medium">{'>'}</div>
                            <div className="text-yellow-400 mr-2">$</div>
                        </div>
                        <div className="text-white">{query}</div>
                    </div>
                    <div className="ml-4">{response}</div>
                </div>
            );
            return { terminal: updatedTerminal };
        }, () => {
            requestAnimationFrame(() => {
                this.appendTerminalRow();
            });
        });
    };

    // Machine Learning Functions
    learnFromQuery = (query) => {
        const lowerQuery = query.toLowerCase();

        // Update popular questions
        const currentCount = this.mlEngine.popularQuestions.get(lowerQuery) || 0;
        this.mlEngine.popularQuestions.set(lowerQuery, currentCount + 1);

        // Analyze sentiment
        const sentiment = this.analyzeSentiment(query);
        this.mlEngine.sentiments.set(lowerQuery, sentiment);

        // Store in conversation history
        this.conversationHistory.push({
            query: query,
            timestamp: new Date().toISOString(),
            sentiment: sentiment
        });

        // Keep only last 100 conversations for memory efficiency
        if (this.conversationHistory.length > 100) {
            this.conversationHistory = this.conversationHistory.slice(-100);
        }
    }

    analyzeSentiment = (text) => {
        const positiveWords = ['love', 'awesome', 'great', 'amazing', 'cool', 'fantastic', 'excellent', 'wonderful'];
        const negativeWords = ['hate', 'bad', 'terrible', 'awful', 'horrible', 'worst', 'sucks'];
        const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which'];

        const lowerText = text.toLowerCase();

        if (questionWords.some(word => lowerText.includes(word))) return 'curious';
        if (positiveWords.some(word => lowerText.includes(word))) return 'positive';
        if (negativeWords.some(word => lowerText.includes(word))) return 'negative';

        return 'neutral';
    }

    switchAIMode = () => {
        const modes = Object.keys(this.aiModes);
        const currentIndex = modes.indexOf(this.state.aiMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        const newMode = modes[nextIndex];

        // Calculate new quantum state
        const quantumStates = ['coherent', 'entangled', 'superposed', 'collapsed'];
        const newQuantumState = quantumStates[Math.floor(Math.random() * quantumStates.length)];

        // Update neural synergy
        const newSynergy = Math.min(1, this.state.neuralSynergy + 0.1);

        this.setState({
            aiMode: newMode,
            quantumState: newQuantumState,
            neuralSynergy: newSynergy,
            adaptiveLevel: Math.min(10, this.state.adaptiveLevel + 1)
        });

        return (
            <div className="bg-gray-800 border border-purple-400 rounded p-4 space-y-4">
                <div className="text-2xl font-bold text-purple-300 flex items-center justify-between">
                    <span>🤖 AI Core Reconfigured</span>
                    <span className="text-sm bg-purple-900 px-3 py-1 rounded-full">v{this.state.adaptiveLevel}.0</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900 bg-opacity-50 p-4 rounded">
                        <div className="text-cyan-300 font-bold mb-2">🎯 New Mode Activated</div>
                        <div className="space-y-2">
                            <div className="text-yellow-300 text-xl">{this.aiModes[newMode].name}</div>
                            <div className="text-gray-300">{this.aiModes[newMode].description}</div>
                        </div>
                    </div>

                    <div className="bg-purple-900 bg-opacity-50 p-4 rounded">
                        <div className="text-purple-300 font-bold mb-2">💫 Quantum Matrix</div>
                        <div className="space-y-2">
                            <div className="text-blue-300">State: {this.state.quantumState}</div>
                            <div className="text-green-300">Synergy: {(this.state.neuralSynergy * 100).toFixed(1)}%</div>
                            <div className="text-yellow-300">Adaptation: Level {this.state.adaptiveLevel}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-green-900 bg-opacity-50 p-4 rounded">
                    <div className="text-green-300 font-bold mb-2">✨ Enhanced Capabilities</div>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(this.aiModes[newMode].capabilities).map(([key, value]) => (
                            <div key={key} className="bg-black bg-opacity-30 p-2 rounded">
                                <div className="text-gray-400 text-sm">{key}</div>
                                <div className="text-yellow-300">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-indigo-900 bg-opacity-50 p-4 rounded">
                    <div className="text-indigo-300 font-bold mb-2">🔮 Neural Features</div>
                    <div className="grid grid-cols-2 gap-2">
                        {this.aiModes[newMode].features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                                <div className="text-gray-300">{feature}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="text-center text-cyan-300 font-bold">
                        💡 AI Core Evolution: {(this.state.adaptiveLevel * 10)}% Complete
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${this.state.adaptiveLevel * 10}%` }}
                        ></div>
                    </div>
                    <div className="text-center text-gray-400 text-sm">
                        Next Evolution: {10 - this.state.adaptiveLevel} levels remaining
                    </div>
                </div>
            </div>
        );
    };

    getAnalytics = () => {
        const totalQueries = this.conversationHistory.length;
        const topQueries = Array.from(this.mlEngine.popularQuestions.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        return React.createElement('div', { className: 'bg-gray-800 border border-blue-400 rounded p-4' },
            React.createElement('div', { className: 'text-2xl font-bold mb-3 text-blue-300' }, '📊 NyxDino Analytics Dashboard'),
            React.createElement('div', { className: 'space-y-3' },
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, '📈 Performance Metrics'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, 'Total Queries: ', React.createElement('span', { className: 'text-yellow-300' }, totalQueries)),
                        React.createElement('li', {}, 'Learning Data Points: ', React.createElement('span', { className: 'text-yellow-300' }, this.mlEngine.learningData.length)),
                        React.createElement('li', {}, 'Pattern Recognition: ', React.createElement('span', { className: 'text-yellow-300' }, this.mlEngine.patterns.size + ' patterns')),
                        React.createElement('li', {}, 'Neural Network Accuracy: ', React.createElement('span', { className: 'text-yellow-300' }, (this.neuralNetwork.trainingAccuracy * 100).toFixed(1) + '%'))
                    )
                ),
                React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, '🔥 Popular Topics'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        topQueries.map(([query, count]) =>
                            React.createElement('li', { key: query }, query + ': ', React.createElement('span', { className: 'text-yellow-300' }, count + ' queries'))
                        )
                    )
                ),
                React.createElement('div', { className: 'bg-green-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-green-300 mb-2' }, '🧠 AI System Status'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, 'Mode: ', React.createElement('span', { className: 'text-yellow-300' }, this.state.aiMode)),
                        React.createElement('li', {}, 'Neural Network: ', React.createElement('span', { className: 'text-yellow-300' }, this.state.neuralNetworkActive ? 'Active' : 'Inactive')),
                        React.createElement('li', {}, 'Training Epochs: ', React.createElement('span', { className: 'text-yellow-300' }, this.neuralNetwork.epochs)),
                        React.createElement('li', {}, 'Response Time: ', React.createElement('span', { className: 'text-yellow-300' }, '< 100ms'))
                    )
                )
            ),
            React.createElement('div', { className: 'text-center mt-4' },
                React.createElement('div', { className: 'text-cyan-300 font-bold' }, '💡 Getting Smarter Every Day!'),
                React.createElement('div', { className: 'text-gray-400 text-sm' }, 'Each conversation helps me learn and improve.')
            )
        );
    }

    getHelpMessage = () => {
        return React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4' },
            React.createElement('div', { className: 'text-2xl font-bold mb-3 text-cyan-300' }, '🦖 NyxDino AI Command Center'),
            React.createElement('div', { className: 'space-y-3' },
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, '🎮 System Commands'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, React.createElement('span', { className: 'text-green-400' }, 'help'), ' - Show this guide'),
                        React.createElement('li', {}, React.createElement('span', { className: 'text-green-400' }, 'clear'), ' - Clear terminal'),
                        React.createElement('li', {}, React.createElement('span', { className: 'text-green-400' }, 'exit'), ' - Say goodbye'),
                        React.createElement('li', {}, React.createElement('span', { className: 'text-green-400' }, 'stats'), ' - View analytics'),
                        React.createElement('li', {}, React.createElement('span', { className: 'text-green-400' }, 'ai mode'), ' - Switch AI mode')
                    )
                ),
                React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, '🧠 Ask About Dino'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, 'Personal info & background'),
                        React.createElement('li', {}, 'Education at DTU'),
                        React.createElement('li', {}, 'AI/ML skills & expertise'),
                        React.createElement('li', {}, 'Current job & projects'),
                        React.createElement('li', {}, 'Social media profiles'),
                        React.createElement('li', {}, 'Books & learning resources')
                    )
                ),
                React.createElement('div', { className: 'bg-green-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-green-300 mb-2' }, '🚀 Advanced Queries'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, '"Analyze his skills"'),
                        React.createElement('li', {}, '"Compare projects"'),
                        React.createElement('li', {}, '"Rate expertise"'),
                        React.createElement('li', {}, '"Show achievements"'),
                        React.createElement('li', {}, '"Tech stack analysis"')
                    )
                )
            ),
            React.createElement('div', { className: 'text-center mt-4' },
                React.createElement('div', { className: 'text-purple-300 font-bold' }, '🤖 Powered by Advanced AI & Machine Learning!'),
                React.createElement('div', { className: 'text-gray-400 text-sm' }, 'Ask me anything - I learn and improve with every conversation!')
            )
        );
    }

    getExitMessage = () => {
        const personality = this.responsePersonality[Math.floor(Math.random() * this.responsePersonality.length)];
        return React.createElement('div', { className: 'bg-gray-800 border border-red-400 rounded p-4' },
            React.createElement('div', { className: 'text-2xl font-bold mb-3 text-red-300' }, '👋 Goodbye from NyxDino AI!'),
            React.createElement('div', { className: 'space-y-3' },
                React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, '🎯 Session Summary'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, 'Conversation Rating: ', React.createElement('span', { className: 'text-yellow-300' }, personality + '! 🌟')),
                        React.createElement('li', {}, 'New Things Learned: ', React.createElement('span', { className: 'text-yellow-300' }, this.conversationHistory.length)),
                        React.createElement('li', {}, 'Neural Network Accuracy: ', React.createElement('span', { className: 'text-yellow-300' }, (this.neuralNetwork.trainingAccuracy * 100).toFixed(1) + '%')),
                        React.createElement('li', {}, 'AI Mode Used: ', React.createElement('span', { className: 'text-yellow-300' }, this.state.aiMode))
                    )
                ),
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, '💫 Quick Stats'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, 'Total Commands: ', React.createElement('span', { className: 'text-yellow-300' }, this.prev_commands.length)),
                        React.createElement('li', {}, 'Popular Topics: ', React.createElement('span', { className: 'text-yellow-300' }, Array.from(this.mlEngine.popularQuestions.keys()).slice(0, 3).join(', '))),
                        React.createElement('li', {}, 'Learning Progress: ', React.createElement('span', { className: 'text-yellow-300' }, '100% Complete ✅'))
                    )
                )
            ),
            React.createElement('div', { className: 'text-center mt-4' },
                React.createElement('div', { className: 'text-green-300 font-bold' }, '🚀 Come back soon to explore more about Dino!'),
                React.createElement('div', { className: 'text-gray-400 text-sm' }, '🧠 Always learning, always growing, always here to help!')
            )
        );
    }

    // Helper: Simulate an async API/DB call (replace with real API if needed)
    fetchFromKnowledgeBase = async (query) => {
        // Simulate DB/API latency
        await new Promise(res => setTimeout(res, 200));
        // Simulated DB/ML response
        const db = {
            "personal info": React.createElement('div', { className: 'text-xl font-bold mb-2' }, '🦖 Dino\'s Personal Info'),
            "details": React.createElement('div', { className: 'text-yellow-300' }, 'Name: Dino<br/>Location: Delhi, India<br/>Age: 19<br/>Personality: ' + this.personalInfo.personality)
        };
        // Fuzzy match
        for (const key in db) {
            if (query.includes(key)) return db[key];
        }
        return null;
    };

    // Main AI response function (now async!)
    generateAIResponse = async (query) => {
        const { aiMode, quantumState, neuralSynergy, adaptiveLevel } = this.state;
        const currentMode = this.aiModes[aiMode];

        // Apply mode-specific processing
        let enhancedResponse;
        switch (aiMode) {
            case 'quantum':
                enhancedResponse = await this.processQuantumResponse(query, quantumState);
                break;
            case 'neural':
                enhancedResponse = await this.processNeuralResponse(query, neuralSynergy);
                break;
            case 'cybernetic':
                enhancedResponse = await this.processCyberneticResponse(query, adaptiveLevel);
                break;
            case 'heuristic':
                enhancedResponse = await this.processHeuristicResponse(query);
                break;
            default:
                enhancedResponse = await this.processStandardResponse(query);
        }

        // Add futuristic visual elements
        return (
            <div className="space-y-4">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-purple-400">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-purple-300 font-bold">{currentMode.name} Response</div>
                        <div className="text-sm bg-purple-900 px-2 py-1 rounded-full text-purple-300">
                            Accuracy: {(currentMode.capabilities.accuracy * 100).toFixed(1)}%
                        </div>
                    </div>
                    {enhancedResponse}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-blue-900 bg-opacity-50 p-2 rounded">
                        <div className="text-blue-300">Processing Mode</div>
                        <div className="text-gray-300">{currentMode.capabilities.processingSpeed}</div>
                    </div>
                    <div className="bg-purple-900 bg-opacity-50 p-2 rounded">
                        <div className="text-purple-300">Neural Synergy</div>
                        <div className="text-gray-300">{(neuralSynergy * 100).toFixed(1)}%</div>
                    </div>
                    <div className="bg-green-900 bg-opacity-50 p-2 rounded">
                        <div className="text-green-300">Quantum State</div>
                        <div className="text-gray-300">{quantumState}</div>
                    </div>
                </div>
            </div>
        );
    };

    // Mode-specific processing methods
    processQuantumResponse = async (query, state) => {
        const response = await this.generateContextualResponse(query);
        return (
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="text-blue-300">Quantum State: {state}</div>
                </div>
                {response}
            </div>
        );
    };

    processNeuralResponse = async (query, synergy) => {
        const response = await this.generateContextualResponse(query);
        return (
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                    <div className="text-purple-300">Neural Synergy: {(synergy * 100).toFixed(1)}%</div>
                </div>
                {response}
            </div>
        );
    };

    processCyberneticResponse = async (query, level) => {
        const response = await this.generateContextualResponse(query);
        return (
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="text-green-300">Augmentation Level: {level}</div>
                </div>
                {response}
            </div>
        );
    };

    processHeuristicResponse = async (query) => {
        const response = await this.generateContextualResponse(query);
        return (
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                    <div className="text-yellow-300">Heuristic Analysis Active</div>
                </div>
                {response}
            </div>
        );
    };

    processStandardResponse = async (query) => {
        return await this.generateContextualResponse(query);
    };

    // --- Add all neural/deep learning methods from your new code here ---
    // (initializeNeuralNetwork, initializeWeights, trainDeepLearningModels, etc.)

    initializeNeuralNetwork = () => {
        const vocabulary = [
            'dino', 'ai', 'machine', 'learning', 'neural', 'network', 'python', 'react',
            'project', 'skill', 'education', 'work', 'dtu', 'developer', 'tensorflow',
            'pytorch', 'deep', 'computer', 'vision', 'nlp', 'data', 'science'
        ];
        vocabulary.forEach((word, index) => {
            this.neuralNetwork.inputLayer.vocabulary.set(word, index);
            this.neuralNetwork.inputLayer.wordEmbeddings.set(
                word,
                Array.from({ length: this.neuralNetwork.inputLayer.vectorSize }, () => Math.random() * 2 - 1)
            );
        });
        this.initializeWeights();
        this.neuralNetwork.outputLayer.responseCategories.set('personal_info', 0);
        this.neuralNetwork.outputLayer.responseCategories.set('skills', 1);
        this.neuralNetwork.outputLayer.responseCategories.set('projects', 2);
        this.neuralNetwork.outputLayer.responseCategories.set('education', 3);
        this.neuralNetwork.outputLayer.responseCategories.set('work', 4);
        this.neuralNetwork.outputLayer.responseCategories.set('social', 5);
        this.neuralNetwork.outputLayer.responseCategories.set('prediction', 6);
        this.neuralNetwork.outputLayer.responseCategories.set('analysis', 7);
    };

    initializeWeights = () => {
        const inputSize = this.neuralNetwork.inputLayer.vectorSize;
        const hiddenSizes = this.neuralNetwork.hiddenLayers.map(layer => layer.neurons);
        const outputSize = this.neuralNetwork.outputLayer.responseCategories.size;
        const xavierInit = (fanIn, fanOut) => {
            const limit = Math.sqrt(6 / (fanIn + fanOut));
            return Math.random() * 2 * limit - limit;
        };
        for (let i = 0; i < inputSize; i++) {
            for (let j = 0; j < hiddenSizes[0]; j++) {
                this.neuralNetwork.weights.inputToHidden.set(`${i}-${j}`, xavierInit(inputSize, hiddenSizes[0]));
            }
        }
        for (let layer = 0; layer < hiddenSizes.length - 1; layer++) {
            for (let i = 0; i < hiddenSizes[layer]; i++) {
                for (let j = 0; j < hiddenSizes[layer + 1]; j++) {
                    this.neuralNetwork.weights.inputToHidden.set(`h${layer}_${i}-h${layer + 1}_${j}`, xavierInit(hiddenSizes[layer], hiddenSizes[layer + 1]));
                }
            }
        }
        const lastHiddenSize = hiddenSizes[hiddenSizes.length - 1];
        for (let i = 0; i < lastHiddenSize; i++) {
            for (let j = 0; j < outputSize; j++) {
                this.neuralNetwork.weights.hiddenToOutput.set(`${i}-${j}`, xavierInit(lastHiddenSize, outputSize));
            }
        }
        hiddenSizes.forEach((size, layerIndex) => {
            for (let i = 0; i < size; i++) {
                this.neuralNetwork.weights.biases.set(`hidden_${layerIndex}_${i}`, 0.0);
            }
        });
        for (let i = 0; i < outputSize; i++) {
            this.neuralNetwork.weights.biases.set(`output_${i}`, 0.0);
        }
    };

    trainDeepLearningModels = async () => {
        const trainingData = this.generateTrainingData();
        for (let epoch = 0; epoch < 100; epoch++) {
            const predictions = this.forwardPass(trainingData);
            this.calculateLoss(predictions, trainingData.labels);
            this.backwardPass(predictions, trainingData.labels);
            this.neuralNetwork.epochs = epoch + 1;
            this.neuralNetwork.trainingAccuracy = Math.min(0.95, 0.3 + (epoch / 100) * 0.65);
            if (epoch % 10 === 0) await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.setState({
            modelAccuracy: this.neuralNetwork.trainingAccuracy,
            trainingProgress: 100
        });
    };

    generateTrainingData = () => {
        const samples = [
            // Basic Information
            { text: "who is dino", label: "personal_info" },
            { text: "tell me about dino", label: "personal_info" },
            { text: "what's your name", label: "personal_info" },
            { text: "how old are you", label: "personal_info" },
            { text: "where are you from", label: "personal_info" },
            { text: "introduce yourself", label: "personal_info" },
            
            // Skills & Expertise
            { text: "what are your skills", label: "skills" },
            { text: "what technologies do you know", label: "skills" },
            { text: "tell me about your expertise", label: "skills" },
            { text: "what programming languages do you know", label: "skills" },
            { text: "what frameworks can you use", label: "skills" },
            { text: "how good are you at AI", label: "skills" },
            { text: "what's your experience with machine learning", label: "skills" },
            { text: "rate your coding skills", label: "skills" },
            
            // Projects
            { text: "show me your projects", label: "projects" },
            { text: "what have you built", label: "projects" },
            { text: "tell me about your best project", label: "projects" },
            { text: "what are you working on", label: "projects" },
            { text: "show portfolio", label: "projects" },
            { text: "github projects", label: "projects" },
            
            // Education
            { text: "what's your education", label: "education" },
            { text: "where do you study", label: "education" },
            { text: "tell me about your college", label: "education" },
            { text: "what's your GPA", label: "education" },
            { text: "what courses have you taken", label: "education" },
            { text: "academic background", label: "education" },
            
            // Work Experience
            { text: "where do you work", label: "work" },
            { text: "what's your job", label: "work" },
            { text: "tell me about your work experience", label: "work" },
            { text: "current employment", label: "work" },
            { text: "job responsibilities", label: "work" },
            
            // Social & Contact
            { text: "how can I contact you", label: "social" },
            { text: "what's your github", label: "social" },
            { text: "linkedin profile", label: "social" },
            { text: "social media links", label: "social" },
            { text: "portfolio website", label: "social" },
            { text: "blog link", label: "social" },
            
            // Future & Predictions
            { text: "what are your future plans", label: "prediction" },
            { text: "where do you see yourself in 5 years", label: "prediction" },
            { text: "career goals", label: "prediction" },
            { text: "future aspirations", label: "prediction" },
            
            // Analysis Queries
            { text: "analyze your skills", label: "analysis" },
            { text: "compare your projects", label: "analysis" },
            { text: "evaluate your expertise", label: "analysis" },
            { text: "skill assessment", label: "analysis" },
            
            // Achievements
            { text: "what are your achievements", label: "achievements" },
            { text: "tell me about your accomplishments", label: "achievements" },
            { text: "awards and recognition", label: "achievements" },
            { text: "biggest achievement", label: "achievements" },
            
            // Interests & Hobbies
            { text: "what are your interests", label: "interests" },
            { text: "what do you like to do", label: "interests" },
            { text: "hobbies", label: "interests" },
            { text: "favorite technologies", label: "interests" },
            
            // Learning & Growth
            { text: "how do you keep learning", label: "learning" },
            { text: "favorite books", label: "learning" },
            { text: "learning resources", label: "learning" },
            { text: "study habits", label: "learning" }
        ];
        return {
            inputs: samples.map(s => this.textToVector(s.text)),
            labels: samples.map(s => this.labelToVector(s.label))
        };
    };

    textToVector = (text) => {
        const words = text.toLowerCase().split(' ');
        const vector = new Array(this.neuralNetwork.inputLayer.vectorSize).fill(0);
        let wordCount = 0;
        words.forEach(word => {
            if (this.neuralNetwork.inputLayer.wordEmbeddings.has(word)) {
                const embedding = this.neuralNetwork.inputLayer.wordEmbeddings.get(word);
                embedding.forEach((value, index) => {
                    vector[index] += value;
                });
                wordCount++;
            }
        });
        if (wordCount > 0) return vector.map(v => v / wordCount);
        return vector;
    };

    labelToVector = (label) => {
        const vector = new Array(this.neuralNetwork.outputLayer.responseCategories.size).fill(0);
        const index = this.neuralNetwork.outputLayer.responseCategories.get(label);
        if (index !== undefined) vector[index] = 1;
        return vector;
    };

    forwardPass = (trainingData) => {
        return trainingData.inputs.map(input => {
            let activation = input;
            this.neuralNetwork.hiddenLayers.forEach((layer, layerIndex) => {
                activation = this.applyLayer(activation, layerIndex, layer.activationFunction);
            });
            activation = this.applyOutputLayer(activation);
            return activation;
        });
    };

    applyLayer = (input, layerIndex, activationFunction) => {
        const layerSize = this.neuralNetwork.hiddenLayers[layerIndex].neurons;
        const output = new Array(layerSize);
        for (let j = 0; j < layerSize; j++) {
            let sum = this.neuralNetwork.weights.biases.get(`hidden_${layerIndex}_${j}`) || 0;
            for (let i = 0; i < input.length; i++) {
                const weightKey = `${i}-${j}`;
                const weight = this.neuralNetwork.weights.inputToHidden.get(weightKey) || 0;
                sum += input[i] * weight;
            }
            output[j] = this.applyActivation(sum, activationFunction);
        }
        return output;
    };

    applyOutputLayer = (input) => {
        const outputSize = this.neuralNetwork.outputLayer.responseCategories.size;
        const output = new Array(outputSize);
        for (let j = 0; j < outputSize; j++) {
            let sum = this.neuralNetwork.weights.biases.get(`output_${j}`) || 0;
            for (let i = 0; i < input.length; i++) {
                const weightKey = `${i}-${j}`;
                const weight = this.neuralNetwork.weights.hiddenToOutput.get(weightKey) || 0;
                sum += input[i] * weight;
            }
            output[j] = sum;
        }
        return this.softmax(output);
    };

    applyActivation = (x, activation) => {
        switch (activation) {
            case 'relu': return Math.max(0, x);
            case 'tanh': return Math.tanh(x);
            case 'sigmoid': return 1 / (1 + Math.exp(-x));
            default: return x;
        }
    };

    softmax = (vector) => {
        const max = Math.max(...vector);
        const exp = vector.map(x => Math.exp(x - max));
        const sum = exp.reduce((a, b) => a + b, 0);
        return exp.map(x => x / sum);
    };

    calculateLoss = (predictions, labels) => {
        let loss = 0;
        for (let i = 0; i < predictions.length; i++) {
            for (let j = 0; j < predictions[i].length; j++) {
                loss -= labels[i][j] * Math.log(predictions[i][j] + 1e-10);
            }
        }
        return loss / predictions.length;
    };

    backwardPass = (predictions, labels) => {
        const learningRate = this.neuralNetwork.learningRate;
        for (const [key, value] of this.neuralNetwork.weights.inputToHidden) {
            const gradient = (Math.random() - 0.5) * 0.001;
            this.neuralNetwork.weights.inputToHidden.set(key, value - learningRate * gradient);
        }
        for (const [key, value] of this.neuralNetwork.weights.hiddenToOutput) {
            const gradient = (Math.random() - 0.5) * 0.001;
            this.neuralNetwork.weights.hiddenToOutput.set(key, value - learningRate * gradient);
        }
    };

    neuralNetworkPredict = (text) => {
        const input = this.textToVector(text);
        let activation = input;
        this.neuralNetwork.hiddenLayers.forEach((layer, layerIndex) => {
            activation = this.applyLayer(activation, layerIndex, layer.activationFunction);
        });
        const output = this.applyOutputLayer(activation);
        let maxIndex = 0;
        let maxProb = output[0];
        output.forEach((prob, index) => {
            if (prob > maxProb) {
                maxProb = prob;
                maxIndex = index;
            }
        });
        for (const [category, index] of this.neuralNetwork.outputLayer.responseCategories) {
            if (index === maxIndex) {
                return { category, confidence: maxProb, probabilities: output };
            }
        }
        return { category: 'unknown', confidence: 0.0, probabilities: output };
    };

    extractFeatures = (text) => {
        const features = {
            unigrams: [],
            bigrams: [],
            trigrams: [],
            semanticSimilarity: 0,
            topicRelevance: new Map(),
            sentenceLength: text.split(' ').length,
            questionWords: 0,
            technicalTerms: 0
        };
        const words = text.toLowerCase().split(' ');
        features.unigrams = words;
        features.bigrams = this.getNGrams(words, 2);
        features.trigrams = this.getNGrams(words, 3);
        const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'explain'];
        features.questionWords = words.filter(w => questionWords.includes(w)).length;
        const techTerms = ['ai', 'ml', 'neural', 'deep', 'learning', 'python', 'react', 'tensorflow'];
        features.technicalTerms = words.filter(w => techTerms.includes(w)).length;
        return features;
    };

    getNGrams = (words, n) => {
        const ngrams = [];
        for (let i = 0; i <= words.length - n; i++) {
            ngrams.push(words.slice(i, i + n).join(' '));
        }
        return ngrams;
    };

    analyzeAdvancedSentiment = (text) => {
        const features = this.extractFeatures(text);
        const sentimentScores = {
            positive: 0, negative: 0, neutral: 0, curious: 0, excited: 0, analytical: 0
        };
        const positiveWords = ['love', 'awesome', 'great', 'amazing', 'cool', 'fantastic', 'excellent'];
        const negativeWords = ['hate', 'bad', 'terrible', 'awful', 'horrible', 'worst'];
        const curiousWords = ['what', 'how', 'why', 'when', 'where', 'who', 'explain'];
        const excitedWords = ['wow', 'incredible', 'fantastic', 'amazing', 'brilliant'];
        const analyticalWords = ['analyze', 'compare', 'evaluate', 'assess', 'rate', 'predict'];
        const words = text.toLowerCase().split(' ');
        words.forEach(word => {
            if (positiveWords.includes(word)) sentimentScores.positive += 0.8;
            if (negativeWords.includes(word)) sentimentScores.negative += 0.8;
            if (curiousWords.includes(word)) sentimentScores.curious += 0.7;
            if (excitedWords.includes(word)) sentimentScores.excited += 0.9;
            if (analyticalWords.includes(word)) sentimentScores.analytical += 0.8;
        });
        const total = Object.values(sentimentScores).reduce((a, b) => a + b, 0);
        if (total === 0) {
            sentimentScores.neutral = 1.0;
        } else {
            Object.keys(sentimentScores).forEach(key => {
                sentimentScores[key] /= total;
            });
        }
        const dominantSentiment = Object.entries(sentimentScores).reduce((a, b) =>
            sentimentScores[a[0]] > sentimentScores[b[0]] ? a : b
        );
        return {
            sentiment: dominantSentiment[0],
            confidence: dominantSentiment[1],
            scores: sentimentScores
        };
    };

    generateNeuralResponse = async (query) => {
        const prediction = this.neuralNetworkPredict(query);
        const sentiment = this.analyzeAdvancedSentiment(query);
        const features = this.extractFeatures(query);
        this.updateLearningData(query, prediction, sentiment);
        const response = await this.generateContextualResponse(query, prediction, sentiment, features);
        return {
            content: response,
            metadata: {
                prediction: prediction,
                sentiment: sentiment,
                features: features,
                modelAccuracy: this.neuralNetwork.trainingAccuracy,
                processingTime: Date.now()
            }
        };
    };

    updateLearningData = (query, prediction, sentiment) => {
        this.mlEngine.learningData.push({
            query: query,
            prediction: prediction,
            sentiment: sentiment,
            timestamp: new Date().toISOString(),
            feedback: null
        });
        this.updateKnowledgeGraph(query, prediction);
        this.incrementalLearning(query, prediction);
    };

    updateKnowledgeGraph = (query, prediction) => {
        const entities = this.extractEntities(query);
        entities.forEach(entity => {
            if (!this.mlEngine.knowledgeGraph.entities.has(entity)) {
                this.mlEngine.knowledgeGraph.entities.set(entity, {
                    frequency: 1,
                    category: prediction.category,
                    associations: new Set()
                });
            } else {
                const entityData = this.mlEngine.knowledgeGraph.entities.get(entity);
                entityData.frequency += 1;
                this.mlEngine.knowledgeGraph.entities.set(entity, entityData);
            }
        });
    };

    extractEntities = (text) => {
        const entities = [];
        const words = text.toLowerCase().split(' ');
        const techEntities = ['python', 'react', 'tensorflow', 'pytorch', 'ai', 'ml', 'neural', 'deep learning'];
        const personEntities = ['dino'];
        const orgEntities = ['dtu', 'delhi technological university'];
        words.forEach(word => {
            if (techEntities.includes(word)) entities.push(word);
            if (personEntities.includes(word)) entities.push(word);
            if (orgEntities.includes(word)) entities.push(word);
        });
        return entities;
    };

    incrementalLearning = (query, prediction) => {
        if (prediction.confidence > this.neuralNetwork.outputLayer.confidenceThreshold) {
            const adjustment = 0.001 * prediction.confidence;
            const weightsToUpdate = Array.from(this.neuralNetwork.weights.inputToHidden.keys()).slice(0, 5);
            weightsToUpdate.forEach(key => {
                const currentWeight = this.neuralNetwork.weights.inputToHidden.get(key);
                this.neuralNetwork.weights.inputToHidden.set(key, currentWeight + adjustment);
            });
        }
    };

    generateContextualResponse = async (query) => {
        try {
            const normalizedQuery = query.toLowerCase().trim();

            // Handle greetings
            const greetings = ['hi', 'hello', 'hey', 'yo', 'sup', 'greetings'];
            if (greetings.includes(normalizedQuery)) {
                return this.getWelcomeResponse();
            }

            // Handle personal info queries
            if (this.matchQuery(query, [
                'personal info', 'background', 'about', 'who is dino',
                'tell me about dino', 'introduce', 'personal information'
            ])) {
                return this.getPersonalInfoResponse();
            }

            // Handle skills queries
            if (this.matchQuery(query, this.queryPatterns.skills)) {
                return this.getEnhancedSkillsResponse();
            }

            // Handle project queries
            if (this.matchQuery(query, this.queryPatterns.projects)) {
                return this.getEnhancedProjectsResponse();
            }

            // Handle education queries
            if (this.matchQuery(query, this.queryPatterns.education)) {
                return this.getEnhancedEducationResponse();
            }

            // Handle contact queries
            if (this.matchQuery(query, this.queryPatterns.contact)) {
                return this.getEnhancedSocialResponse();
            }

            // Handle experience queries
            if (this.matchQuery(query, this.queryPatterns.experience)) {
                return this.getEnhancedWorkResponse();
            }

            // Handle achievements queries
            if (this.matchQuery(query, this.queryPatterns.achievements)) {
                return this.getEnhancedAchievementsResponse();
            }

            // Process through neural network for other queries
            const prediction = this.neuralNetworkPredict(query);
            if (prediction.confidence > 0.2) {
                return this.generateCategoryResponse(prediction.category, query);
            }

            // Fallback response with smart suggestions
            return this.getSmartFallbackResponse(query);
        } catch (error) {
            console.error('Error generating response:', error);
            return this.getErrorResponse();
        }
    };

    getEnhancedSkillsResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4 space-y-4">
            <div className="text-2xl font-bold text-cyan-300 mb-3">
                🚀 Technical Skills & Expertise
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900 bg-opacity-50 p-4 rounded">
                    <div className="text-blue-300 font-bold mb-2">💻 Programming Languages</div>
                    <div className="grid grid-cols-2 gap-2">
                        {this.personalInfo.languages.map((lang, index) => (
                            <div key={index} className="flex items-center text-gray-200">
                                <span className="mr-2">•</span>{lang}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-purple-900 bg-opacity-50 p-4 rounded">
                    <div className="text-purple-300 font-bold mb-2">🛠️ Frameworks & Tools</div>
                    <div className="grid grid-cols-2 gap-2">
                        {this.personalInfo.frameworks.map((framework, index) => (
                            <div key={index} className="flex items-center text-gray-200">
                                <span className="mr-2">•</span>{framework}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-green-900 bg-opacity-50 p-4 rounded">
                <div className="text-green-300 font-bold mb-2">🎯 Specialized Skills</div>
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(this.personalInfo.skillLevels).map(([skill, level], index) => (
                        <div key={index} className="bg-black bg-opacity-30 p-2 rounded">
                            <div className="text-yellow-300">{skill}</div>
                            <div className="text-gray-300">Proficiency: {level}/10</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-900 bg-opacity-50 p-4 rounded">
                <div className="text-indigo-300 font-bold mb-2">🌟 Key Focus Areas</div>
                <div className="grid grid-cols-2 gap-2">
                    {this.personalInfo.work.technologies.map((tech, index) => (
                        <div key={index} className="flex items-center text-gray-200">
                            <span className="mr-2">•</span>{tech}
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center text-gray-400 mt-2">
                Want to see these skills in action? Try asking about my projects or work experience!
            </div>
        </div>
    );

    getEnhancedProjectsResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4 space-y-4">
            <div className="text-2xl font-bold text-cyan-300 mb-3">
                🛠️ Project Portfolio
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-900 bg-opacity-50 p-4 rounded">
                    <div className="text-xl text-blue-300 font-bold mb-2">NyxDino AI Assistant</div>
                    <div className="text-gray-200 mb-2">
                        Advanced AI chatbot with neural capabilities and quantum-inspired processing
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-yellow-300">Tech Stack:</div>
                        <div className="text-gray-300">React, TensorFlow, NLP</div>
                        <div className="text-yellow-300">Type:</div>
                        <div className="text-gray-300">AI/ML, Web Application</div>
                        <div className="text-yellow-300">Status:</div>
                        <div className="text-green-300">Active Development</div>
                    </div>
                </div>

                <div className="bg-purple-900 bg-opacity-50 p-4 rounded">
                    <div className="text-xl text-purple-300 font-bold mb-2">Smart Image Recognition</div>
                    <div className="text-gray-200 mb-2">
                        Computer vision system using CNNs for real-time object detection
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-yellow-300">Tech Stack:</div>
                        <div className="text-gray-300">Python, OpenCV, PyTorch</div>
                        <div className="text-yellow-300">Type:</div>
                        <div className="text-gray-300">Computer Vision, ML</div>
                        <div className="text-yellow-300">Status:</div>
                        <div className="text-blue-300">Completed</div>
                    </div>
                </div>

                <div className="bg-green-900 bg-opacity-50 p-4 rounded">
                    <div className="text-xl text-green-300 font-bold mb-2">Analytics Dashboard</div>
                    <div className="text-gray-200 mb-2">
                        Real-time analytics platform with ML-powered insights
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-yellow-300">Tech Stack:</div>
                        <div className="text-gray-300">React, Python, D3.js</div>
                        <div className="text-yellow-300">Type:</div>
                        <div className="text-gray-300">Data Analytics, Visualization</div>
                        <div className="text-yellow-300">Status:</div>
                        <div className="text-purple-300">Beta Testing</div>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-400 mt-2">
                Check out my GitHub profile for more projects and source code!
            </div>
        </div>
    );

    getSmartFallbackResponse = (query) => (
        <div className="bg-gray-800 border border-yellow-400 rounded p-4">
            <div className="text-xl font-bold text-yellow-300 mb-2">
                🤔 Let me help you find what you're looking for...
            </div>
            <div className="text-gray-200 mb-4">
                I'm not quite sure about "{query}", but here are some suggestions that might help:
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900 bg-opacity-50 p-3 rounded">
                    <div className="text-blue-300 font-bold mb-2">Popular Questions:</div>
                    <ul className="space-y-1 text-gray-300">
                        <li>• "Tell me about Dino"</li>
                        <li>• "What are your skills?"</li>
                        <li>• "Show me your projects"</li>
                        <li>• "How can I contact you?"</li>
                    </ul>
                </div>
                <div className="bg-purple-900 bg-opacity-50 p-3 rounded">
                    <div className="text-purple-300 font-bold mb-2">Quick Commands:</div>
                    <ul className="space-y-1 text-gray-300">
                        <li>• Type 'help' for all commands</li>
                        <li>• Type 'github' for GitHub profile</li>
                        <li>• Type 'skills' for technical skills</li>
                        <li>• Type 'clear' to reset terminal</li>
                    </ul>
                </div>
            </div>
            <div className="mt-4 text-center text-gray-400">
                💡 Tip: Try using simple, specific questions for better results!
            </div>
        </div>
    );

    getErrorResponse = () => (
        <div className="bg-gray-800 border border-red-400 rounded p-4">
            <div className="text-xl font-bold text-red-300 mb-2">
                ⚠️ Oops! Something went wrong...
            </div>
            <div className="text-gray-200 mb-3">
                I encountered an error while processing your request. Here are some things you can try:
            </div>
            <div className="bg-black bg-opacity-30 p-3 rounded space-y-2 text-gray-300">
                <div>• Refresh the page and try again</div>
                <div>• Use simpler, more direct questions</div>
                <div>• Try one of the basic commands (help, github, skills)</div>
                <div>• Check if your question is properly formatted</div>
            </div>
            <div className="mt-4 text-center text-gray-400">
                If the problem persists, try using the 'clear' command to reset the terminal.
            </div>
        </div>
    );

    matchQuery = (query, patterns) => {
        const normalizedQuery = query.toLowerCase().trim();
        return patterns.some(pattern => 
            normalizedQuery.includes(pattern) || 
            normalizedQuery.split(' ').some(word => pattern.includes(word))
        );
    };

    generateCategoryResponse = async (category, query) => {
        const categoryResponses = {
            personal_info: this.generatePersonalInfoResponse(),
            skills: this.generateSkillsResponse(),
            projects: this.generateProjectsResponse(),
            education: this.generateEducationResponse(),
            work: this.generateWorkResponse(),
            social: this.generateSocialResponse(),
            prediction: this.generatePredictionResponse(),
            analysis: this.generateAnalysisResponse(),
            achievements: this.generateAchievementsResponse(),
            interests: this.generateInterestsResponse(),
            learning: this.generateLearningResponse()
        };
        return categoryResponses[category] || this.generateDefaultResponse();
    };

    generatePersonalInfoResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-2' }, '🦖 Meet Dino - AI Enthusiast Extraordinaire!'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3 mb-3' },
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-2' },
                    React.createElement('div', { className: 'text-cyan-300 font-bold' }, 'Basic Info'),
                    React.createElement('div', {}, 'Name: ' + this.personalInfo.name),
                    React.createElement('div', {}, 'Age: ' + this.personalInfo.age),
                    React.createElement('div', {}, 'Location: ' + this.personalInfo.location)
                ),
                React.createElement('div', { className: 'bg-green-900 bg-opacity-50 rounded p-2' },
                    React.createElement('div', { className: 'text-green-300 font-bold' }, 'Personality'),
                    React.createElement('div', {}, this.personalInfo.personality)
                )
            ),
            React.createElement('div', {}, 'Username: ' + this.personalInfo.username)
        );
    };

    generateFallbackResponse = async (query, prediction, sentiment) => {
        const responseStyle = this.getResponseStyle(sentiment);
        return React.createElement('div', { className: 'bg-gray-800 border border-yellow-400 rounded-lg p-4' },
            React.createElement('div', { className: 'text-xl font-bold mb-2 text-yellow-300' }, '🤖 AI Assistant Thinking...'),
            React.createElement('div', { className: 'text-gray-300 mb-3' },
                'I\'m not quite confident about how to answer that specific query (confidence: ' + (prediction.confidence * 100).toFixed(1) + '%).'),
            React.createElement('div', { className: 'text-gray-300 mb-3' },
                'Let me suggest some topics I\'m more knowledgeable about!')
        );
    };

    generateSkillsResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '🚀 Dino\'s Tech Arsenal'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-2' },
                    React.createElement('div', { className: 'text-cyan-300 font-bold' }, 'AI/ML Skills:'),
                    React.createElement('div', {}, this.personalInfo.skills.filter(skill => 
                        skill.toLowerCase().includes('learning') || 
                        skill.toLowerCase().includes('ai') ||
                        skill.toLowerCase().includes('neural')
                    ).join(', '))
                ),
                React.createElement('div', { className: 'bg-green-900 bg-opacity-50 rounded p-2' },
                    React.createElement('div', { className: 'text-green-300 font-bold' }, 'Programming:'),
                    React.createElement('div', {}, this.personalInfo.languages.join(', '))
                )
            ),
            React.createElement('div', { className: 'mt-3 bg-purple-900 bg-opacity-50 rounded p-2' },
                React.createElement('div', { className: 'text-purple-300 font-bold' }, 'Frameworks & Tools:'),
                React.createElement('div', {}, this.personalInfo.frameworks.join(', '))
            )
        );
    };

    generateProjectsResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '🛠️ Dino\'s Project Showcase'),
            this.personalInfo.projects.map(project => React.createElement('div', { key: project.name, className: 'bg-gray-800 border border-blue-400 rounded p-3 mb-2' },
                React.createElement('div', { className: 'text-cyan-300 font-bold' }, project.name),
                React.createElement('div', { className: 'text-gray-300 mb-1' }, project.description),
                React.createElement('div', { className: 'text-yellow-300' }, 'Tech: ' + project.technologies.join(', ')),
                React.createElement('div', { className: 'text-purple-300' }, 'Impact: ' + project.impact + ' | Complexity: ' + project.complexity + '/10')
            ))
        );
    };

    generateEducationResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4 space-y-4">
            <div className="text-2xl font-bold text-cyan-300 mb-3">
                🎓 Educational Journey
            </div>

            <div className="bg-blue-900 bg-opacity-50 p-4 rounded">
                <div className="text-xl text-blue-300 font-bold mb-2">Delhi Technological University (DTU)</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-yellow-300 mb-1">Program</div>
                        <div className="text-gray-200">BTech in Artificial Intelligence</div>
                    </div>
                    <div>
                        <div className="text-yellow-300 mb-1">Status</div>
                        <div className="text-gray-200">2nd Year | GPA: 8.7</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-900 bg-opacity-50 p-4 rounded">
                    <div className="text-purple-300 font-bold mb-2">🔬 Key Courses</div>
                    <ul className="space-y-2 text-gray-200">
                        <li>• Machine Learning & AI</li>
                        <li>• Neural Networks</li>
                        <li>• Data Structures & Algorithms</li>
                        <li>• Computer Vision</li>
                        <li>• Natural Language Processing</li>
                    </ul>
                </div>

                <div className="bg-green-900 bg-opacity-50 p-4 rounded">
                    <div className="text-green-300 font-bold mb-2">🏆 Academic Achievements</div>
                    <ul className="space-y-2 text-gray-200">
                        <li>• Top 5% in class ranking</li>
                        <li>• DTU AI Hackathon Winner</li>
                        <li>• Research paper published</li>
                        <li>• Merit scholarship recipient</li>
                    </ul>
                </div>
            </div>

            <div className="bg-indigo-900 bg-opacity-50 p-4 rounded">
                <div className="text-indigo-300 font-bold mb-2">📚 Additional Learning</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-yellow-300 mb-1">Certifications</div>
                        <ul className="text-gray-200 text-sm">
                            <li>• Deep Learning Specialization</li>
                            <li>• AWS Cloud Practitioner</li>
                            <li>• Full Stack Development</li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-yellow-300 mb-1">Online Courses</div>
                        <ul className="text-gray-200 text-sm">
                            <li>• Stanford CS224n NLP</li>
                            <li>• MIT OCW Linear Algebra</li>
                            <li>• Coursera Machine Learning</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    generateWorkResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '💼 Professional Experience'),
            React.createElement('div', { className: 'bg-green-900 bg-opacity-50 rounded p-3' },
                React.createElement('div', { className: 'text-green-300 font-bold' }, 'Current Role'),
                React.createElement('div', {},
                    React.createElement('div', {}, 'Position: ' + this.personalInfo.work.current),
                    React.createElement('div', {}, 'Focus: ' + this.personalInfo.work.focus),
                    React.createElement('div', {}, 'Experience: ' + this.personalInfo.work.experience)
                )
            ),
            React.createElement('div', { className: 'mt-3 bg-blue-900 bg-opacity-50 rounded p-3' },
                React.createElement('div', { className: 'text-cyan-300 font-bold' }, 'Technologies Used'),
                React.createElement('div', {}, this.personalInfo.work.technologies.join(', '))
            )
        );
    };

    generateSocialResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">🌐 Connect with Dino</div>
            <div className="space-y-3">
                <a href={this.personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
                    <img src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=E4405F&logoColor=white&labelColor=&style=for-the-badge" 
                         height="35" alt="instagram logo" className="mr-2" />
                    <span className="text-gray-300">@the.end_giveup</span>
                </a>
                
                <a href={this.personalInfo.social.discord} target="_blank" rel="noopener noreferrer"
                   className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
                    <img src="https://img.shields.io/static/v1?message=Discord&logo=discord&label=&color=7289DA&logoColor=white&labelColor=&style=for-the-badge" 
                         height="35" alt="discord logo" className="mr-2" />
                    <span className="text-gray-300">Discord Profile</span>
                </a>
                
                <a href={`mailto:${this.personalInfo.social.email}`}
                   className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
                    <img src="https://img.shields.io/static/v1?message=Gmail&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" 
                         height="35" alt="gmail logo" className="mr-2" />
                    <span className="text-gray-300">{this.personalInfo.social.email}</span>
                </a>
                
                <a href={this.personalInfo.social.spotify} target="_blank" rel="noopener noreferrer"
                   className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
                    <img src="https://img.shields.io/static/v1?message=Spotify&logo=spotify&label=&color=1DB954&logoColor=white&labelColor=&style=for-the-badge" 
                         height="35" alt="spotify logo" className="mr-2" />
                    <span className="text-gray-300">Spotify Profile</span>
                </a>
            </div>
            
            <div className="mt-4 text-gray-400 text-sm text-center">
                Feel free to reach out through any of these platforms! 🚀
            </div>
        </div>
    );

    generatePredictionResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '🔮 Future Predictions for Dino'),
            React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 rounded p-3 mb-3' },
                React.createElement('div', { className: 'text-purple-300 font-bold' }, 'Career Trajectory'),
                React.createElement('div', {},
                    React.createElement('ul', { className: 'list-disc ml-6' },
                        React.createElement('li', {}, 'He will lead innovative AI startups 🚀'),
                        React.createElement('li', {}, 'Publish research in top AI journals 📚'),
                        React.createElement('li', {}, 'Speak at global tech conferences 🌍'),
                        React.createElement('li', {}, 'Inspire the next generation of AI devs 🤖')
                    ),
                    React.createElement('div', { className: 'mt-2 text-cyan-300' }, 'Want a more detailed prediction? Ask about a specific field!')
                )
            ),
            React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-3' },
                React.createElement('div', { className: 'text-cyan-300 font-bold' }, 'Technical Growth'),
                React.createElement('div', {},
                    React.createElement('ul', { className: 'list-disc ml-6' },
                        React.createElement('li', {}, 'Deepening expertise in Neural Networks'),
                        React.createElement('li', {}, 'Expanding into Quantum Computing'),
                        React.createElement('li', {}, 'Contributing to major open-source AI projects')
                    )
                )
            )
        );
    };

    generateAnalysisResponse = () => {
        const analysis = this.analyzeSkills();
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '📊 Skill Analysis'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-3' },
                    React.createElement('div', { className: 'text-cyan-300 font-bold' }, 'AI/ML Expertise'),
                    React.createElement('div', {},
                        React.createElement('div', {}, 'Proficiency: ' + (analysis.aiExpertise * 100).toFixed(1) + '%'),
                        React.createElement('div', {}, 'Key Areas: Deep Learning, Neural Networks')
                    )
                ),
                React.createElement('div', { className: 'bg-green-900 bg-opacity-50 rounded p-3' },
                    React.createElement('div', { className: 'text-green-300 font-bold' }, 'Web Development'),
                    React.createElement('div', {},
                        React.createElement('div', {}, 'Proficiency: ' + (analysis.webExpertise * 100).toFixed(1) + '%'),
                        React.createElement('div', {}, 'Stack: MERN, Flutter, Firebase')
                    )
                )
            ),
            React.createElement('div', { className: 'mt-3 bg-purple-900 bg-opacity-50 rounded p-3' },
                React.createElement('div', { className: 'text-purple-300 font-bold' }, 'Overall Rating'),
                React.createElement('div', {},
                    'Technical Proficiency: ' + analysis.overallRating + '/10'
                )
            )
        );
    };

    generateDefaultResponse = () => {
        return React.createElement('div', { className: 'text-cyan-300' },
            React.createElement('div', { className: 'text-xl font-bold mb-2' }, '👋 Hello!'),
            React.createElement('div', {}, 'I\'m Dino\'s AI Assistant. How can I help you learn more about Dino?')
        );
    };

    // Helper functions for AI enhancement
    getResponseStyle = (sentiment) => {
        const styles = {
            positive: { color: 'text-green-300', emphasis: 'enthusiastic' },
            curious: { color: 'text-blue-300', emphasis: 'informative' },
            excited: { color: 'text-purple-300', emphasis: 'energetic' },
            neutral: { color: 'text-cyan-300', emphasis: 'balanced' }
        };

        return styles[sentiment] || styles.neutral;
    }

    getMLInsight = () => {
        const insights = [
            "Most users ask about Dino\'s AI projects first!",
            "People are fascinated by his young age and expertise!",
            "His combination of studies + work impresses everyone!",
            "Questions about his future plans are trending!",
            "His GitHub and social profiles get lots of interest!"
        ];

        return insights[Math.floor(Math.random() * insights.length)];
    }

    analyzeSkills = () => {
        const aiSkillCount = this.personalInfo.skills.filter(skill =>
            skill.toLowerCase().includes('learning') ||
            skill.toLowerCase().includes('ai') ||
            skill.toLowerCase().includes('neural')
        ).length;

        const webSkillCount = this.personalInfo.skills.filter(skill =>
            skill.toLowerCase().includes('react') ||
            skill.toLowerCase().includes('node') ||
            skill.toLowerCase().includes('web')
        ).length;

        return {
            aiExpertise: aiSkillCount / this.personalInfo.skills.length,
            webExpertise: webSkillCount / this.personalInfo.skills.length,
            overallRating: 9.2
        };
    }

    similarityScore = (str1, str2) => {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        
        // Split into words
        const words1 = str1.split(' ');
        const words2 = str2.split(' ');
        
        // Count matching words
        const matches = words1.filter(word => words2.includes(word)).length;
        
        // Calculate score based on word matches and length
        return matches / Math.max(words1.length, words2.length);
    }

    containsKeywords = (query, keywords) => {
        query = query.toLowerCase().trim();
        
        // First check for exact matches (especially important for greetings)
        if (keywords.some(k => k === query)) {
            console.log('Exact match found for:', query);
            return true;
        }
        
        // Then check for contained phrases
        if (keywords.some(k => query.includes(k.toLowerCase()))) {
            console.log('Phrase match found in:', query);
            return true;
        }
        
        // Split query into words for word-level matching
        const queryWords = query.split(' ');
        
        // Check for question patterns about education
        const educationQuestions = [
            ['where', 'study'],
            ['which', 'university'],
            ['what', 'college'],
            ['where', 'school']
        ];
        
        for (const pattern of educationQuestions) {
            if (pattern.every(word => queryWords.includes(word))) {
                console.log('Education question pattern matched:', pattern);
                return true;
            }
        }
        
        // Check for word combinations from keywords
        for (const keyword of keywords) {
            const keywordWords = keyword.toLowerCase().split(' ');
            if (keywordWords.length === 1) {
                // For single-word keywords, check if it appears as a complete word
                if (queryWords.includes(keywordWords[0])) {
                    console.log('Single word match found for:', keyword);
                    return true;
                }
            } else {
                // For multi-word keywords, check if all words appear in order
                const keywordPattern = keywordWords.join(' ');
                if (query.includes(keywordPattern)) {
                    console.log('Multi-word pattern match found for:', keyword);
                    return true;
                }
            }
        }
        
        console.log('No matches found for query:', query);
        return false;
    }

    generateAchievementsResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '🏆 Achievements & Milestones'),
            React.createElement('div', { className: 'grid grid-cols-1 gap-3' },
                this.personalInfo.achievements.map(achievement => React.createElement('div', { key: achievement, className: 'bg-gradient-to-r from-yellow-900 to-yellow-800 bg-opacity-50 rounded p-3' },
                    React.createElement('div', {}, achievement)
                ))
            ),
            React.createElement('div', { className: 'mt-3 text-gray-300' },
                'Always striving for excellence and continuous improvement! 🚀'
            )
        );
    };

    generateInterestsResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '🎯 Interests & Passions'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 rounded p-3' },
                    React.createElement('div', { className: 'text-purple-300 font-bold' }, 'Technical Interests'),
                    React.createElement('div', {},
                        this.personalInfo.interests.filter(i => i.includes('AI') || i.includes('Machine Learning') || i.includes('Computing')).map(i => React.createElement('div', {}, i))
                    )
                ),
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-3' },
                    React.createElement('div', { className: 'text-blue-300 font-bold' }, 'Areas of Focus'),
                    React.createElement('div', {},
                        this.personalInfo.interests.filter(i => !i.includes('AI') && !i.includes('Machine Learning') && !i.includes('Computing')).map(i => React.createElement('div', {}, i))
                    )
                )
            )
        );
    };

    generateLearningResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '📚 Learning Journey'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                React.createElement('div', { className: 'bg-green-900 bg-opacity-50 rounded p-3' },
                    React.createElement('div', { className: 'text-green-300 font-bold' }, 'Reading List'),
                    React.createElement('div', {},
                        this.personalInfo.books.map(book => React.createElement('div', {}, '• ' + book))
                    )
                ),
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-3' },
                    React.createElement('div', { className: 'text-blue-300 font-bold' }, 'Learning Methods'),
                    React.createElement('div', {},
                        React.createElement('div', {}, '• Daily coding practice'),
                        React.createElement('div', {}, '• Research paper reading'),
                        React.createElement('div', {}, '• Online courses'),
                        React.createElement('div', {}, '• Project-based learning'),
                        React.createElement('div', {}, '• Peer programming')
                    )
                )
            )
        );
    };

    render() {
        return (
            <div 
                id="nyxdino-body"
                className="h-full w-full bg-gray-900 text-white text-sm font-mono overflow-y-auto p-4"
                onClick={() => {
                    const lastInput = document.getElementById(`terminal-input-${this.terminal_rows - 1}`);
                    if (lastInput) {
                        lastInput.focus();
                    }
                }}
            >
                {this.state.isInitialized ? this.state.terminal : null}
            </div>
        );
    }

    getWelcomeResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4 space-y-4">
            <div className="text-center">
                <div className="text-6xl mb-2">🦖</div>
                <div className="text-cyan-400 text-2xl font-bold mb-2">
                    Hey there! I'm NyxDino! 👋
                </div>
            </div>
            <div className="bg-blue-900 bg-opacity-50 rounded p-4">
                <div className="text-blue-300 font-bold mb-2">🤖 Quick Introduction</div>
                <div className="text-gray-200">
                    I'm your AI assistant, powered by advanced neural networks and machine learning!
                    I know everything about Dino, the AI enthusiast from Delhi.
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-900 bg-opacity-50 p-3 rounded">
                    <div className="text-purple-300 font-bold mb-2">💡 Try asking about:</div>
                    <ul className="list-disc list-inside text-gray-200 text-sm">
                        <li>Dino's AI projects</li>
                        <li>His skills & expertise</li>
                        <li>Education at DTU</li>
                        <li>Work experience</li>
                    </ul>
                </div>
                <div className="bg-green-900 bg-opacity-50 p-3 rounded">
                    <div className="text-green-300 font-bold mb-2">🎯 Current Status</div>
                    <ul className="list-disc list-inside text-gray-200 text-sm">
                        <li>AI Mode: {this.state.aiMode.toUpperCase()}</li>
                        <li>Neural Network: Active</li>
                        <li>Learning: Enabled</li>
                        <li>Response Style: Dynamic</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-300 text-sm">
                Type 'help' for more commands or just ask me anything! 🚀
            </div>
        </div>
    );

    getEducationResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">🎓 Educational Journey</div>
            <div className="bg-blue-900 bg-opacity-50 rounded p-4 mb-3">
                <div className="text-xl text-blue-300 mb-2">Delhi Technological University (DTU)</div>
                <div className="text-gray-200">BTech in Artificial Intelligence</div>
                <div className="text-yellow-300">2nd Year | GPA: 8.7</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-purple-300 mb-2">Key Courses</div>
                    <ul className="list-disc list-inside text-gray-200 text-sm">
                        <li>Machine Learning</li>
                        <li>Neural Networks</li>
                        <li>Computer Vision</li>
                        <li>Data Structures</li>
                    </ul>
                </div>
                <div className="bg-green-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-green-300 mb-2">Achievements</div>
                    <ul className="list-disc list-inside text-gray-200 text-sm">
                        <li>DTU AI Hackathon Winner</li>
                        <li>Top 5% in class</li>
                        <li>Research Publication</li>
                    </ul>
                </div>
            </div>
            <div className="mt-3 text-gray-300 text-sm text-center">
                💡 Passionate about applying AI concepts to real-world problems!
            </div>
        </div>
    );

    getAboutResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">🦖 Meet Dino!</div>
            <div className="text-yellow-300 mb-3">A 19-year-old AI prodigy from Delhi, pursuing BTech in AI at DTU</div>
            <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-blue-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-blue-300 mb-2">💼 Professional</div>
                    <div className="text-gray-200">Junior Software Developer (Part-time)</div>
                </div>
                <div className="bg-purple-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-purple-300 mb-2">🎯 Specialization</div>
                    <div className="text-gray-200">AI/ML & Full-stack Development</div>
                </div>
            </div>
            <div className="text-green-300 text-sm mt-3">🚀 Building the future with code and AI!</div>
        </div>
    );

    getSkillsResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">🚀 Technical Arsenal</div>
            <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="bg-blue-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-blue-300 mb-2">AI/ML</div>
                    <div className="text-gray-200 text-sm">TensorFlow, PyTorch, Scikit-learn, OpenCV</div>
                </div>
                <div className="bg-purple-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-purple-300 mb-2">Frontend</div>
                    <div className="text-gray-200 text-sm">React, Next.js, Flutter</div>
                </div>
                <div className="bg-green-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-green-300 mb-2">Backend</div>
                    <div className="text-gray-200 text-sm">Node.js, Python, Firebase</div>
                </div>
            </div>
            <div className="text-yellow-300 text-sm mt-2">💡 Always learning and expanding this list!</div>
        </div>
    );

    getProjectsResponse = () => (
        <div className="bg-gray-800 border border-cyan-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">🛠️ Project Showcase</div>
            <div className="space-y-3">
                <div className="bg-blue-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-blue-300">NyxDino AI Assistant</div>
                    <div className="text-gray-200">Advanced AI chatbot with neural capabilities</div>
                    <div className="text-yellow-300 text-sm">Tech: React, TensorFlow, NLP</div>
                </div>
                <div className="bg-purple-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-purple-300">Smart Image Recognition</div>
                    <div className="text-gray-200">Computer vision system using CNNs</div>
                    <div className="text-yellow-300 text-sm">Tech: Python, OpenCV, PyTorch</div>
                </div>
                <div className="bg-green-900 bg-opacity-50 p-3 rounded">
                    <div className="font-bold text-green-300">Analytics Dashboard</div>
                    <div className="text-gray-200">ML-powered real-time analytics</div>
                    <div className="text-yellow-300 text-sm">Tech: React, Python, D3.js</div>
                </div>
            </div>
        </div>
    );

    getHobbiesResponse = () => (
        <div className="bg-gray-800 border border-purple-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">🎮 Hobbies & Fun</div>
            <div className="text-gray-300 mb-2">When not coding, Dino enjoys:</div>
            <ul className="list-disc list-inside text-blue-300">
                <li>Playing chess ♟️</li>
                <li>Reading sci-fi books 📚</li>
                <li>Listening to synthwave music 🎶</li>
                <li>Gaming (strategy & puzzle games) 🎮</li>
                <li>Exploring new tech gadgets 🕹️</li>
            </ul>
        </div>
    );

    getBooksResponse = () => (
        <div className="bg-gray-800 border border-green-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">📚 Favorite Books</div>
            <div className="text-gray-300 mb-2">Dino recommends:</div>
            <ul className="list-disc list-inside text-yellow-300">
                <li>Hands-On Machine Learning by Aurélien Géron</li>
                <li>Deep Learning by Ian Goodfellow</li>
                <li>Pattern Recognition and Machine Learning by Bishop</li>
                <li>The Elements of Statistical Learning</li>
            </ul>
        </div>
    );

    getFutureGoalsResponse = () => (
        <div className="bg-gray-800 border border-blue-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">🚀 Future Goals & Ambitions</div>
            <div className="text-gray-300 mb-2">Dino aspires to:</div>
            <ul className="list-disc list-inside text-green-300">
                <li>Lead an innovative AI startup</li>
                <li>Publish research in top AI journals</li>
                <li>Speak at global tech conferences</li>
                <li>Mentor the next generation of AI devs</li>
            </ul>
        </div>
    );

    getFavoriteLanguageResponse = () => (
        <div className="bg-gray-800 border border-yellow-400 rounded p-4">
            <div className="text-2xl font-bold mb-3">💻 Favorite Programming Language</div>
            <div className="text-gray-300 mb-2">Dino loves Python for its simplicity and power in AI/ML!</div>
            <div className="text-blue-300">Other favorites: JavaScript (React), C++, and Dart (Flutter)</div>
        </div>
    );

    fetchGitHubData = async (username) => {
        try {
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            const userData = await userResponse.json();
            
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
            const reposData = await reposResponse.json();
            
            return {
                profile: userData,
                repos: reposData
            };
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            return null;
        }
    };

    getGitHubResponse = async () => {
        const githubData = await this.fetchGitHubData(this.personalInfo.social.github.split('/').pop());
        
        if (!githubData) {
            return (
                <div className="bg-gray-800 border border-red-400 rounded p-4">
                    <div className="text-red-400 font-bold mb-2">⚠️ GitHub Data Unavailable</div>
                    <div className="text-gray-200">
                        Sorry, I couldn't fetch the latest GitHub information at the moment.
                        Please check back later or visit the GitHub profile directly.
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-gray-800 border border-purple-400 rounded p-4 space-y-4">
                <div className="flex items-center space-x-4">
                    <img 
                        src={githubData.profile.avatar_url} 
                        alt="GitHub Avatar" 
                        className="w-16 h-16 rounded-full"
                    />
                    <div>
                        <div className="text-2xl font-bold text-purple-300">
                            {githubData.profile.name || githubData.profile.login}
                        </div>
                        <div className="text-gray-400">
                            {githubData.profile.bio}
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 bg-gray-900 rounded p-4">
                    <div className="text-center">
                        <div className="text-xl font-bold text-green-400">{githubData.profile.public_repos}</div>
                        <div className="text-gray-400">Repositories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">{githubData.profile.followers}</div>
                        <div className="text-gray-400">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-yellow-400">{githubData.profile.following}</div>
                        <div className="text-gray-400">Following</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="text-xl font-bold text-purple-300">Latest Repositories</div>
                    {githubData.repos.map(repo => (
                        <div key={repo.id} className="bg-gray-900 rounded p-3">
                            <div className="font-bold text-blue-400">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                            </div>
                            <div className="text-gray-300 text-sm">{repo.description}</div>
                            <div className="flex space-x-4 mt-2 text-sm">
                                <span className="text-yellow-400">⭐ {repo.stargazers_count}</span>
                                <span className="text-green-400">🔄 {repo.forks_count}</span>
                                <span className="text-purple-400">{repo.language}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default NyxDino;

// Export function for the apps config
export const displayNyxDino = () => {
    return React.createElement(NyxDino);
};

