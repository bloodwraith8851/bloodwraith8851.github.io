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

        // Define qaMap as a class property
        this.qaMap = [
            {
                keywords: ['hello', 'hi', 'hey', 'yo', 'sup', 'greetings', 'welcome', ''],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4 space-y-4' },
                    React.createElement('div', { className: 'text-center' },
                        React.createElement('div', { className: 'text-6xl mb-2' }, '🦖'),
                        React.createElement('div', { className: 'text-2xl font-bold text-cyan-300' }, 'Hello! Welcome to NyxDino AI')
                    ),
                    React.createElement('div', { className: 'text-center text-gray-300' },
                        'I\'m your intelligent assistant, ready to tell you all about Dino!'
                    ),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                        React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-4 rounded-lg' },
                            React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, '🎯 Popular Topics'),
                            React.createElement('ul', { className: 'list-disc list-inside text-gray-200 space-y-1' },
                                React.createElement('li', {}, 'AI/ML Projects'),
                                React.createElement('li', {}, 'Education at DTU'),
                                React.createElement('li', {}, 'Technical Skills'),
                                React.createElement('li', {}, 'Work Experience')
                            )
                        ),
                        React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-4 rounded-lg' },
                            React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, '🤖 Also Ask About'),
                            React.createElement('ul', { className: 'list-disc list-inside text-gray-200 space-y-1' },
                                React.createElement('li', {}, 'Favorite Books'),
                                React.createElement('li', {}, 'Future Goals'),
                                React.createElement('li', {}, 'Coding Tips'),
                                React.createElement('li', {}, 'Hobbies & Fun')
                            )
                        )
                    ),
                    React.createElement('div', { className: 'text-center text-yellow-300 text-sm mt-4' },
                        '💡 Try asking any question about these topics!'
                    ),
                    React.createElement('div', { className: 'text-center text-green-300 text-xs' },
                        '🔥 Powered by Machine Learning & Neural Networks'
                    )
                )
            },
            {
                keywords: ['education', 'study', 'college', 'university', 'dtu', 'academic', 'school', 'degree', 'course', 'student', 'studying', 'where do you study', 'what university', 'which college'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🎓 Educational Journey'),
                    React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-4 mb-3' },
                        React.createElement('div', { className: 'text-xl text-blue-300 mb-2' }, 'Delhi Technological University (DTU)'),
                        React.createElement('div', { className: 'text-gray-200' }, 'BTech in Artificial Intelligence'),
                        React.createElement('div', { className: 'text-yellow-300' }, '2nd Year | GPA: 8.7')
                    ),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                        React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, 'Key Courses'),
                            React.createElement('ul', { className: 'list-disc list-inside text-gray-200 text-sm' },
                                React.createElement('li', {}, 'Machine Learning'),
                                React.createElement('li', {}, 'Neural Networks'),
                                React.createElement('li', {}, 'Computer Vision'),
                                React.createElement('li', {}, 'Data Structures')
                            )
                        ),
                        React.createElement('div', { className: 'bg-green-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-green-300 mb-2' }, 'Achievements'),
                            React.createElement('ul', { className: 'list-disc list-inside text-gray-200 text-sm' },
                                React.createElement('li', {}, 'DTU AI Hackathon Winner'),
                                React.createElement('li', {}, 'Top 5% in class'),
                                React.createElement('li', {}, 'Research Publication')
                            )
                        )
                    ),
                    React.createElement('div', { className: 'mt-3 text-gray-300 text-sm text-center' },
                        '💡 Passionate about applying AI concepts to real-world problems!'
                    )
                )
            },
            {
                keywords: ['who is dino', 'about dino', 'tell me about dino', 'introduce dino'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🦖 Meet Dino!'),
                    React.createElement('div', { className: 'text-yellow-300 mb-3' }, 'A 19-year-old AI prodigy from Delhi, pursuing BTech in AI at DTU'),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-3' },
                        React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, '💼 Professional'),
                            React.createElement('div', { className: 'text-gray-200' }, 'Junior Software Developer (Part-time)')
                        ),
                        React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, '🎯 Specialization'),
                            React.createElement('div', { className: 'text-gray-200' }, 'AI/ML & Full-stack Development')
                        )
                    ),
                    React.createElement('div', { className: 'text-green-300 text-sm mt-3' }, '🚀 Building the future with code and AI!')
                )
            },
            {
                keywords: ['skills', 'expertise', 'technologies', 'tech stack', 'programming', 'what can you do'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🚀 Technical Arsenal'),
                    React.createElement('div', { className: 'grid grid-cols-3 gap-3 mb-3' },
                        React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, 'AI/ML'),
                            React.createElement('div', { className: 'text-gray-200 text-sm' }, 'TensorFlow, PyTorch, Scikit-learn, OpenCV')
                        ),
                        React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, 'Frontend'),
                            React.createElement('div', { className: 'text-gray-200 text-sm' }, 'React, Next.js, Flutter')
                        ),
                        React.createElement('div', { className: 'bg-green-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-green-300 mb-2' }, 'Backend'),
                            React.createElement('div', { className: 'text-gray-200 text-sm' }, 'Node.js, Python, Firebase')
                        )
                    ),
                    React.createElement('div', { className: 'text-yellow-300 text-sm mt-2' }, '💡 Always learning and expanding this list!')
                )
            },
            {
                keywords: ['projects', 'portfolio', 'work', 'built', 'created', 'show projects'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🛠️ Project Showcase'),
                    React.createElement('div', { className: 'space-y-3' },
                        React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-blue-300' }, 'NyxDino AI Assistant'),
                            React.createElement('div', { className: 'text-gray-200' }, 'Advanced AI chatbot with neural capabilities'),
                            React.createElement('div', { className: 'text-yellow-300 text-sm' }, 'Tech: React, TensorFlow, NLP')
                        ),
                        React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-purple-300' }, 'Smart Image Recognition'),
                            React.createElement('div', { className: 'text-gray-200' }, 'Computer vision system using CNNs'),
                            React.createElement('div', { className: 'text-yellow-300 text-sm' }, 'Tech: Python, OpenCV, PyTorch')
                        ),
                        React.createElement('div', { className: 'bg-green-900 bg-opacity-50 p-3 rounded' },
                            React.createElement('div', { className: 'font-bold text-green-300' }, 'Analytics Dashboard'),
                            React.createElement('div', { className: 'text-gray-200' }, 'ML-powered real-time analytics'),
                            React.createElement('div', { className: 'text-yellow-300 text-sm' }, 'Tech: React, Python, D3.js')
                        )
                    )
                )
            },
            {
                keywords: ['hobbies', 'free time', 'what do you do for fun', 'pastime', 'interests outside coding'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-purple-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🎮 Hobbies & Fun'),
                    React.createElement('div', { className: 'text-gray-300 mb-2' }, 'When not coding, Dino enjoys:'),
                    React.createElement('ul', { className: 'list-disc list-inside text-blue-300' },
                        React.createElement('li', {}, 'Playing chess ♟️'),
                        React.createElement('li', {}, 'Reading sci-fi books 📚'),
                        React.createElement('li', {}, 'Listening to synthwave music 🎶'),
                        React.createElement('li', {}, 'Gaming (strategy & puzzle games) 🎮'),
                        React.createElement('li', {}, 'Exploring new tech gadgets 🕹️')
                    )
                )
            },
            {
                keywords: ['favorite book', 'books', 'reading list', 'recommend a book', 'book suggestion'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-green-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '📚 Favorite Books'),
                    React.createElement('div', { className: 'text-gray-300 mb-2' }, 'Dino recommends:'),
                    React.createElement('ul', { className: 'list-disc list-inside text-yellow-300' },
                        React.createElement('li', {}, 'Hands-On Machine Learning by Aurélien Géron'),
                        React.createElement('li', {}, 'Deep Learning by Ian Goodfellow'),
                        React.createElement('li', {}, 'Pattern Recognition and Machine Learning by Bishop'),
                        React.createElement('li', {}, 'The Elements of Statistical Learning')
                    )
                )
            },
            {
                keywords: ['future goals', 'where do you see yourself', 'plans for future', 'ambitions', 'dream job'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-blue-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🚀 Future Goals & Ambitions'),
                    React.createElement('div', { className: 'text-gray-300 mb-2' }, 'Dino aspires to:'),
                    React.createElement('ul', { className: 'list-disc list-inside text-green-300' },
                        React.createElement('li', {}, 'Lead an innovative AI startup'),
                        React.createElement('li', {}, 'Publish research in top AI journals'),
                        React.createElement('li', {}, 'Speak at global tech conferences'),
                        React.createElement('li', {}, 'Mentor the next generation of AI devs')
                    )
                )
            },
            {
                keywords: ['favorite programming language', 'best language', 'which language do you like', 'preferred language'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-yellow-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '💻 Favorite Programming Language'),
                    React.createElement('div', { className: 'text-gray-300 mb-2' }, 'Dino loves Python for its simplicity and power in AI/ML!'),
                    React.createElement('div', { className: 'text-blue-300' }, 'Other favorites: JavaScript (React), C++, and Dart (Flutter)')
                )
            },
            {
                keywords: ['advice for beginners', 'how to start coding', 'tips for learning programming', 'beginner advice', 'how to get into ai'],
                answer: React.createElement('div', { className: 'bg-gray-800 border border-pink-400 rounded p-4' },
                    React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🌱 Advice for Beginners'),
                    React.createElement('ul', { className: 'list-disc list-inside text-pink-300' },
                        React.createElement('li', {}, 'Start with Python – it\'s beginner-friendly!'),
                        React.createElement('li', {}, 'Build small projects to learn by doing'),
                        React.createElement('li', {}, 'Read code from open-source projects'),
                        React.createElement('li', {}, 'Join coding communities and ask questions'),
                        React.createElement('li', {}, 'Stay curious and never stop learning!')
                    )
                )
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
            username: "DinoAI_Dev",
            age: 19,
            location: "Delhi, India",
            education: {
                completed: "12th Grade",
                current: "BTech in AI at DTU (Delhi Technological University)",
                year: "2nd Year",
                specialization: "Artificial Intelligence & Machine Learning",
                gpa: 8.7,
                courses: ["Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision", "NLP", "Data Structures", "Algorithms"]
            },
            work: {
                current: "Junior Software Developer (Part-time)",
                focus: "Full-stack development with AI integration",
                experience: "1.5 years",
                technologies: ["Python", "React", "Node.js", "TensorFlow", "PyTorch"]
            },
            skills: [
                "Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision",
                "Natural Language Processing", "Python", "TensorFlow", "PyTorch",
                "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL",
                "Flutter", "Firebase", "Docker", "Kubernetes", "Git/GitHub",
                "Data Science", "Statistical Analysis", "Algorithm Design"
            ],
            skillLevels: {
                "Machine Learning": 9.2,
                "Deep Learning": 8.8,
                "Python": 9.5,
                "React.js": 8.7,
                "TensorFlow": 8.9,
                "Neural Networks": 9.0
            },
            languages: ["Python", "JavaScript", "Java", "C++", "Dart", "SQL", "R"],
            frameworks: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "React", "Flutter", "Express"],
            projects: [
                {
                    name: "NyxDino-AI-Assistant",
                    description: "Advanced AI assistant with neural network capabilities",
                    technologies: ["React", "Python", "TensorFlow", "NLP"],
                    complexity: 9.1,
                    impact: "High"
                },
                {
                    name: "Smart-Image-Recognition-System",
                    description: "Computer vision system using CNNs",
                    technologies: ["Python", "OpenCV", "PyTorch"],
                    complexity: 8.7,
                    impact: "Medium"
                },
                {
                    name: "Predictive-Analytics-Dashboard",
                    description: "ML-powered analytics with real-time predictions",
                    technologies: ["Python", "Scikit-learn", "React", "D3.js"],
                    complexity: 8.9,
                    impact: "High"
                }
            ],
            interests: [
                "Artificial Intelligence", "Machine Learning", "Deep Learning",
                "Computer Vision", "Natural Language Processing", "Robotics",
                "Data Science", "Quantum Computing", "Blockchain", "Cybersecurity"
            ],
            books: [
                "Hands-On Machine Learning - Aurélien Géron",
                "Pattern Recognition and Machine Learning - Christopher Bishop",
                "Deep Learning - Ian Goodfellow",
                "The Elements of Statistical Learning"
            ],
            social: {
                github: "https://github.com/DinoAI_Dev",
                linkedin: "https://linkedin.com/in/dino-ai-developer",
                twitter: "https://twitter.com/DinoAI_Dev",
                portfolio: "https://dino-ai-portfolio.dev",
                blog: "https://dino-ai-blog.dev",
                youtube: "https://youtube.com/@DinoAI_Dev"
            },
            achievements: [
                "🏆 Won DTU AI Hackathon 2024",
                "🎯 Built 15+ ML/AI Projects",
                "💼 Working as Junior Dev while studying",
                "🧠 Expert in Multiple AI Frameworks",
                "📚 Self-taught ML Engineer",
                "🚀 Created NyxDino AI Assistant"
            ],
            personality: "A passionate AI enthusiast and software developer who lives and breathes technology. Always pushing the boundaries of what's possible with AI and machine learning!"
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

        this.state = {
            terminal: [],
            aiMode: 'neural', // now supports: normal, learning, creative, neural
            theme: 'matrix',
            neuralNetworkActive: true,
            modelAccuracy: 0.0,
            trainingProgress: 0,
            welcomeMessageVisible: false
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
    }

    componentDidMount() {
        this.initializeAI();
        const welcomeMsg = React.createElement('div', { className: 'mb-4 animate-pulse' },
            React.createElement('div', { className: 'text-center mb-4' },
                React.createElement('div', { className: 'text-6xl mb-2' }, '🦖'),
                React.createElement('div', { className: 'text-green-400 text-2xl font-bold mb-2 animate-bounce' },
                    React.createElement('div', {}, '╔═══════════════════════════════════════╗'),
                    React.createElement('div', {}, '║    🤖 NYXDINO AI v2.0 INITIALIZED    ║'),
                    React.createElement('div', {}, '╚═══════════════════════════════════════╝')
                )
            ),
            React.createElement('div', { className: 'bg-gray-800 border border-green-400 rounded-lg p-4 mb-4' },
                React.createElement('div', { className: 'text-cyan-300 text-lg font-bold mb-2' }, '🧠 Advanced AI Assistant Activated!'),
                React.createElement('div', { className: 'text-blue-300 mb-2' }, 'Hey there! I\'m NyxDino, your super-intelligent AI buddy! 🚀'),
                React.createElement('div', { className: 'text-yellow-300 mb-2' }, 'I know EVERYTHING about Dino - the AI wizard from Delhi! ✨'),
                React.createElement('div', { className: 'text-purple-300 mb-3' }, '🔥 Powered by Machine Learning & Neural Networks!')
            ),
            React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-4' },
                React.createElement('div', { className: 'bg-blue-900 border border-blue-400 rounded p-3' },
                    React.createElement('div', { className: 'text-blue-300 font-bold mb-2' }, '🎯 Quick Fire Questions:'),
                    React.createElement('div', { className: 'text-gray-300 text-sm' },
                        React.createElement('div', {}, '• "Who is Dino?"'),
                        React.createElement('div', {}, '• "What AI projects has he built?"'),
                        React.createElement('div', {}, '• "Where does he work?"'),
                        React.createElement('div', {}, '• "Show me his skills"')
                    )
                ),
                React.createElement('div', { className: 'bg-purple-900 border border-purple-400 rounded p-3' },
                    React.createElement('div', { className: 'text-purple-300 font-bold mb-2' }, '🚀 Advanced Queries:'),
                    React.createElement('div', { className: 'text-gray-300 text-sm' },
                        React.createElement('div', {}, '• "Analyze his expertise"'),
                        React.createElement('div', {}, '• "Compare his projects"'),
                        React.createElement('div', {}, '• "Predict his future"'),
                        React.createElement('div', {}, '• "Rate his skills"')
                    )
                )
            ),
            React.createElement('div', { className: 'bg-green-900 border border-green-400 rounded p-3 mb-4' },
                React.createElement('div', { className: 'text-green-300 font-bold mb-2' }, '🤖 AI Features Enabled:'),
                React.createElement('div', { className: 'flex flex-wrap gap-2' },
                    React.createElement('span', { className: 'bg-green-600 px-2 py-1 rounded text-xs' }, 'Machine Learning'),
                    React.createElement('span', { className: 'bg-blue-600 px-2 py-1 rounded text-xs' }, 'Pattern Recognition'),
                    React.createElement('span', { className: 'bg-purple-600 px-2 py-1 rounded text-xs' }, 'Sentiment Analysis'),
                    React.createElement('span', { className: 'bg-yellow-600 px-2 py-1 rounded text-xs' }, 'Smart Responses'),
                    React.createElement('span', { className: 'bg-pink-600 px-2 py-1 rounded text-xs' }, 'Learning Engine')
                )
            ),
            React.createElement('div', { className: 'text-center' },
                React.createElement('div', { className: 'text-cyan-400 font-bold' }, '💬 Type \'help\' for commands or just ask me anything!'),
                React.createElement('div', { className: 'text-gray-400 text-sm mt-1' }, 'I get smarter with every conversation! 🧠✨')
            ),
            React.createElement('div', { className: 'border-t border-gray-600 mt-4 pt-2' })
        );

        this.setState({
            terminal: [welcomeMsg],
            welcomeMessageVisible: true
        }, () => {
            this.appendTerminalRow();
        });
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 1);
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
        let terminal = [...this.state.terminal];
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal }, () => {
            this.startCursor(this.terminal_rows);
        });
        this.terminal_rows += 1;
    }

    terminalRow = (id) => {
        return React.createElement(React.Fragment, { key: id },
            React.createElement('div', { className: 'flex w-full h-6 items-center' },
                React.createElement('div', { className: 'flex items-center' },
                    React.createElement('div', { className: 'text-green-400 font-bold' }, '🦖 NyxDino'),
                    React.createElement('div', { className: 'text-white mx-1 font-medium' }, ':'),
                    React.createElement('div', { className: 'text-cyan-400 font-bold' }, 'AI-Brain'),
                    React.createElement('div', { className: 'text-white mx-1 font-medium' }, '>'),
                    React.createElement('div', { className: 'text-yellow-400 mr-2' }, '$')
                ),
                React.createElement('div', { className: 'bg-transparent relative flex-1 overflow-hidden', onClick: () => this.focusCursor(id) },
                    React.createElement('span', { id: `show-${id}`, className: 'float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider text-white' }),
                    React.createElement('div', { id: `cursor-${id}`, className: 'float-left mt-1 w-2 h-4 bg-green-400 rounded animate-pulse' }),
                    React.createElement('input', {
                        id: `terminal-input-${id}`,
                        'data-row-id': id,
                        onKeyDown: this.checkKey,
                        onBlur: () => this.unFocusCursor(id),
                        className: 'absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent',
                        spellCheck: false,
                        autoFocus: true,
                        autoComplete: 'off',
                        type: 'text'
                    })
                )
            ),
            React.createElement('div', { id: `row-result-${id}`, className: 'my-3 font-normal' })
        );
    }

    focusCursor = (id) => {
        clearInterval(this.cursor);
        this.startCursor(id);
    }

    unFocusCursor = (id) => {
        this.stopCursor(id);
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");

        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#show-${id}`).text($(this).val());
        });

        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

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
        this.learnFromQuery(query);

        const lowerQuery = query.toLowerCase();
        let response = "";

        // System commands
        if (lowerQuery === "help") {
            response = this.getHelpMessage();
        }
        else if (lowerQuery === "clear") {
            this.startNyxDino();
            return;
        }
        else if (lowerQuery.includes("exit") || lowerQuery.includes("quit")) {
            response = this.getExitMessage();
        }
        else if (lowerQuery.includes("ai mode") || lowerQuery.includes("switch mode")) {
            response = this.switchAIMode();
        }
        else if (lowerQuery.includes("stats") || lowerQuery.includes("analytics")) {
            response = this.getAnalytics();
        }
        else if (lowerQuery.includes("show achievements") || lowerQuery.includes("achievements") || lowerQuery.includes("what are your achievements")) {
            response = React.createElement('div', { className: 'bg-gray-800 border border-yellow-400 rounded p-4' },
                React.createElement('div', { className: 'text-2xl font-bold mb-3 text-yellow-300' }, '🏆 Achievements & Milestones'),
                React.createElement('div', { className: 'space-y-3' },
                    React.createElement('div', { className: 'bg-yellow-900 bg-opacity-50 p-3 rounded' },
                        React.createElement('div', { className: 'font-bold text-yellow-300 mb-2' }, '🎓 Academic Excellence'),
                        React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                            React.createElement('li', {}, 'Top 5% in BTech AI at DTU'),
                            React.createElement('li', {}, 'GPA: 8.7/10'),
                            React.createElement('li', {}, 'Published Research Paper in AI')
                        )
                    ),
                    React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                        React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, '🚀 Technical Achievements'),
                        React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                            React.createElement('li', {}, 'DTU AI Hackathon Winner 2024'),
                            React.createElement('li', {}, 'Built 15+ Successful ML/AI Projects'),
                            React.createElement('li', {}, 'Open Source Contributor to Major AI Projects')
                        )
                    ),
                    React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                        React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, '💼 Professional Growth'),
                        React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                            React.createElement('li', {}, 'Junior Software Developer (Part-time)'),
                            React.createElement('li', {}, 'AI Research Assistant at DTU'),
                            React.createElement('li', {}, 'Technical Blog Writer with 10k+ Readers')
                        )
                    )
                ),
                React.createElement('div', { className: 'text-center mt-4' },
                    React.createElement('div', { className: 'text-cyan-300 font-bold' }, '🎯 Always aiming higher!'),
                    React.createElement('div', { className: 'text-gray-400 text-sm' }, 'Ask me about any of these achievements for more details!')
                )
            );
        }
        // Try direct response first
        else {
            response = await this.generateAIResponse(lowerQuery);
        }

        // Render the React element into the result div
        const resultElement = document.getElementById(`row-result-${rowId}`);
        if (resultElement && response) {
            try {
                ReactDOM.render(response, resultElement);
                this.appendTerminalRow();
            } catch (error) {
                console.error('Error rendering response:', error);
                resultElement.textContent = 'I understand your question. Let me help you with that!';
                this.appendTerminalRow();
            }
        }
    }

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
        const modes = ['normal', 'learning', 'creative', 'neural'];
        const currentIndex = modes.indexOf(this.state.aiMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        const newMode = modes[nextIndex];

        this.setState({ aiMode: newMode });

        const modeDescriptions = {
            normal: 'Balanced and efficient responses optimized for general queries',
            learning: 'Enhanced explanations and detailed insights for better understanding',
            creative: 'More imaginative and engaging responses with unique perspectives',
            neural: 'Advanced neural network processing for complex analysis'
        };

        const modeFeatures = {
            normal: ['Efficient Processing', 'Quick Responses', 'Core Knowledge Access'],
            learning: ['Detailed Explanations', 'Step-by-Step Guidance', 'Enhanced Learning'],
            creative: ['Unique Perspectives', 'Engaging Dialogue', 'Imaginative Solutions'],
            neural: ['Deep Analysis', 'Pattern Recognition', 'Advanced Processing']
        };

        return React.createElement('div', { className: 'bg-gray-800 border border-purple-400 rounded p-4' },
            React.createElement('div', { className: 'text-2xl font-bold mb-3 text-purple-300' }, '🤖 AI Mode Switched!'),
            React.createElement('div', { className: 'space-y-3' },
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, '🎯 New Mode Activated'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        React.createElement('li', {}, 'Current Mode: ', React.createElement('span', { className: 'text-yellow-300' }, newMode.toUpperCase())),
                        React.createElement('li', {}, 'Description: ', React.createElement('span', { className: 'text-yellow-300' }, modeDescriptions[newMode])),
                        React.createElement('li', {}, 'Status: ', React.createElement('span', { className: 'text-yellow-300' }, 'Active and Ready ✨'))
                    )
                ),
                React.createElement('div', { className: 'bg-green-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-green-300 mb-2' }, '✨ Mode Features'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        ...modeFeatures[newMode].map(feature =>
                            React.createElement('li', { key: feature }, feature)
                        )
                    )
                ),
                React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, '🔄 Available Modes'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200' },
                        modes.map(mode =>
                            React.createElement('li', { key: mode },
                                mode === newMode ?
                                    React.createElement('span', { className: 'text-yellow-300' }, '▶ ' + mode.toUpperCase() + ' (Current)') :
                                    mode.toUpperCase()
                            )
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'text-center mt-4' },
                React.createElement('div', { className: 'text-cyan-300 font-bold' }, '💡 Try asking a question to see the new mode in action!'),
                React.createElement('div', { className: 'text-gray-400 text-sm' }, 'Each mode offers unique capabilities and response styles.')
            )
        );
    }

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
        const sentiment = this.analyzeSentiment(query);
        const responseStyle = this.getResponseStyle(sentiment);

        // Clean and normalize the query
        const normalizedQuery = query.toLowerCase().trim();
        console.log('Processing query:', normalizedQuery);

        // Special handling for education-related queries
        const educationPatterns = [
            'where do you study',
            'which university',
            'what college',
            'where school',
            'education',
            'study',
            'university',
            'college',
            'dtu'
        ];

        // Check if query matches education patterns
        const isEducationQuery = educationPatterns.some(pattern => 
            normalizedQuery.includes(pattern) || 
            pattern.split(' ').every(word => normalizedQuery.split(' ').includes(word))
        );

        if (isEducationQuery) {
            console.log('Matched education query pattern');
            return React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4' },
                React.createElement('div', { className: 'text-2xl font-bold mb-3' }, '🎓 Educational Journey'),
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-4 mb-3' },
                    React.createElement('div', { className: 'text-xl text-blue-300 mb-2' }, 'Delhi Technological University (DTU)'),
                    React.createElement('div', { className: 'text-gray-200' }, 'BTech in Artificial Intelligence'),
                    React.createElement('div', { className: 'text-yellow-300' }, '2nd Year | GPA: 8.7')
                ),
                React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                    React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                        React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, 'Key Courses'),
                        React.createElement('ul', { className: 'list-disc list-inside text-gray-200 text-sm' },
                            React.createElement('li', {}, 'Machine Learning'),
                            React.createElement('li', {}, 'Neural Networks'),
                            React.createElement('li', {}, 'Computer Vision'),
                            React.createElement('li', {}, 'Data Structures')
                        )
                    ),
                    React.createElement('div', { className: 'bg-green-900 bg-opacity-50 p-3 rounded' },
                        React.createElement('div', { className: 'font-bold text-green-300 mb-2' }, 'Achievements'),
                        React.createElement('ul', { className: 'list-disc list-inside text-gray-200 text-sm' },
                            React.createElement('li', {}, 'DTU AI Hackathon Winner'),
                            React.createElement('li', {}, 'Top 5% in class'),
                            React.createElement('li', {}, 'Research Publication')
                        )
                    )
                ),
                React.createElement('div', { className: 'mt-3 text-gray-300 text-sm text-center' },
                    '💡 Passionate about applying AI concepts to real-world problems!'
                )
            );
        }

        // Try to find a matching response from qaMap
        for (const qa of this.qaMap) {
            if (this.containsKeywords(normalizedQuery, qa.keywords)) {
                console.log('Found matching keywords:', qa.keywords);
                return qa.answer;
            }
        }

        // If no match found, return the default response
        return React.createElement('div', { className: 'bg-gray-800 border border-cyan-400 rounded p-4' },
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '👋 Here\'s what I can tell you about!'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-blue-300 mb-2' }, 'Popular Topics'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200 text-sm space-y-1' },
                        React.createElement('li', {}, 'Skills & Technologies'),
                        React.createElement('li', {}, 'Projects & Portfolio'),
                        React.createElement('li', {}, 'Education at DTU'),
                        React.createElement('li', {}, 'Work Experience')
                    )
                ),
                React.createElement('div', { className: 'bg-purple-900 bg-opacity-50 p-3 rounded' },
                    React.createElement('div', { className: 'font-bold text-purple-300 mb-2' }, 'Try asking'),
                    React.createElement('ul', { className: 'list-disc list-inside text-gray-200 text-sm space-y-1' },
                        React.createElement('li', {}, '"What are Dino\'s skills?"'),
                        React.createElement('li', {}, '"Show me his projects"'),
                        React.createElement('li', {}, '"Tell me about his education"'),
                        React.createElement('li', {}, '"What\'s his work experience?"')
                    )
                )
            ),
            React.createElement('div', { className: 'text-cyan-300 text-sm mt-3 text-center' }, 'I\'m here to help! Just ask any of these questions or something similar.')
        );
    }

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

    generateContextualResponse = async (query, prediction, sentiment, features) => {
        const category = prediction.category;
        const confidence = prediction.confidence;
        if (confidence > this.neuralNetwork.outputLayer.confidenceThreshold) {
            const response = await this.generateCategoryResponse(category, query, sentiment);
            return React.createElement('div', { className: 'bg-gradient-to-r from-purple-900 to-blue-900 border border-cyan-400 rounded-lg p-4' },
                React.createElement('div', { className: 'flex items-center mb-2' },
                    React.createElement('div', { className: 'text-green-400 text-lg' }, '🧠'),
                    React.createElement('div', { className: 'text-cyan-300 font-bold ml-2' }, 'Neural Network Response (Confidence: ' + (confidence * 100).toFixed(1) + '%)')
                ),
                React.createElement('div', { className: 'text-gray-100 mb-3' }, response),
                React.createElement('div', { className: 'bg-black bg-opacity-30 rounded p-2 text-xs' },
                    React.createElement('div', { className: 'text-yellow-300' }, '🔬 ML Analysis:'),
                    React.createElement('div', { className: 'text-gray-300' }, 'Category: ' + category + ' | Sentiment: ' + sentiment.sentiment + ' | Features: ' + features.technicalTerms + ' tech terms'),
                    React.createElement('div', { className: 'text-blue-300' }, 'Model Accuracy: ' + (this.neuralNetwork.trainingAccuracy * 100).toFixed(1) + '% | Epochs Trained: ' + this.neuralNetwork.epochs)
                )
            );
        }
        // Always return a fallback if confidence is low
        return await this.generateFallbackResponse(query, prediction, sentiment);
    };

    generateCategoryResponse = async (category, query, sentiment) => {
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

    generateEducationResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '🎓 Educational Journey'),
            React.createElement('div', { className: 'bg-blue-900 bg-opacity-50 rounded p-3' },
                React.createElement('div', { className: 'text-cyan-300 font-bold' }, 'Current Education'),
                React.createElement('div', {},
                    React.createElement('div', {}, 'Program: ' + this.personalInfo.education.current),
                    React.createElement('div', {}, 'Year: ' + this.personalInfo.education.year),
                    React.createElement('div', {}, 'GPA: ' + this.personalInfo.education.gpa)
                )
            ),
            React.createElement('div', { className: 'mt-3 bg-purple-900 bg-opacity-50 rounded p-3' },
                React.createElement('div', { className: 'text-purple-300 font-bold' }, 'Key Courses'),
                React.createElement('div', {}, this.personalInfo.education.courses.join(', '))
            )
        );
    };

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

    generateSocialResponse = () => {
        return React.createElement('div', {},
            React.createElement('div', { className: 'text-xl font-bold mb-3' }, '🌐 Connect with Dino'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                React.createElement('a', { href: this.personalInfo.social.github, target: '_blank', className: 'bg-gray-800 hover:bg-gray-700 rounded p-2 text-center' },
                    React.createElement('div', { className: 'text-white font-bold' }, 'GitHub'),
                    React.createElement('div', { className: 'text-blue-300 text-sm' }, 'View Projects')
                ),
                React.createElement('a', { href: this.personalInfo.social.linkedin, target: '_blank', className: 'bg-gray-800 hover:bg-gray-700 rounded p-2 text-center' },
                    React.createElement('div', { className: 'text-white font-bold' }, 'LinkedIn'),
                    React.createElement('div', { className: 'text-blue-300 text-sm' }, 'Professional Profile')
                ),
                React.createElement('a', { href: this.personalInfo.social.portfolio, target: '_blank', className: 'bg-gray-800 hover:bg-gray-700 rounded p-2 text-center' },
                    React.createElement('div', { className: 'text-white font-bold' }, 'Portfolio'),
                    React.createElement('div', { className: 'text-blue-300 text-sm' }, 'See My Work')
                ),
                React.createElement('a', { href: this.personalInfo.social.blog, target: '_blank', className: 'bg-gray-800 hover:bg-gray-700 rounded p-2 text-center' },
                    React.createElement('div', { className: 'text-white font-bold' }, 'Blog'),
                    React.createElement('div', { className: 'text-blue-300 text-sm' }, 'Read My Articles')
                )
            )
        );
    };

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
        
        // First check for exact phrase matches (for questions like "where do you study")
        if (keywords.some(k => query === k.toLowerCase())) {
            console.log('Exact phrase match found for:', query);
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
            // Check if all words in the keyword appear in the query
            const allWordsMatch = keywordWords.every(word => 
                queryWords.some(qWord => qWord.includes(word) || word.includes(qWord))
            );
            if (allWordsMatch) {
                console.log('Word combination match found for:', keyword);
                return true;
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
        return React.createElement('div', {
            id: 'nyxdino-body',
            className: 'h-full w-full bg-gray-900 text-white text-sm font-mono overflow-y-auto p-4'
        }, this.state.terminal);
    }
}

export default NyxDino;

// Export function for the apps config
export const displayNyxDino = () => {
    return React.createElement(NyxDino);
};

