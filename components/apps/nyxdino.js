import React, { Component } from 'react';
import $ from 'jquery';

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

        // AI Learning System
        this.mlEngine = {
            patterns: new Map(),
            sentiments: new Map(),
            popularQuestions: new Map(),
            learningData: []
        };

        // Your personal information database
        this.personalInfo = {
            name: "Dino",
            username: "DinoAI_Dev",
            age: 19,
            location: "Delhi, India",
            education: {
                completed: "12th Grade",
                current: "BTech in AI at DTU (Delhi Technological University)",
                year: "2nd Year",
                specialization: "Artificial Intelligence & Machine Learning"
            },
            work: {
                current: "Junior Software Developer (Part-time)",
                focus: "Full-stack development with AI integration"
            },
            skills: [
                "Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision",
                "Natural Language Processing", "Python", "TensorFlow", "PyTorch",
                "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL",
                "Flutter", "Firebase", "Docker", "Kubernetes", "Git/GitHub",
                "Data Science", "Statistical Analysis", "Algorithm Design"
            ],
            languages: ["Python", "JavaScript", "Java", "C++", "Dart", "SQL", "R"],
            frameworks: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "React", "Flutter", "Express"],
            projects: [
                "NyxDino-AI-Assistant (This one!)",
                "Smart-Image-Recognition-System",
                "Predictive-Analytics-Dashboard",
                "AI-Powered-Chatbot-Framework",
                "Computer-Vision-Object-Detection",
                "Natural-Language-Sentiment-Analyzer",
                "Machine-Learning-Stock-Predictor",
                "Deep-Learning-Image-Generator",
                "AI-Resume-Screening-Tool",
                "Smart-Recommendation-Engine"
            ],
            interests: [
                "Artificial Intelligence", "Machine Learning", "Deep Learning",
                "Computer Vision", "Natural Language Processing", "Robotics",
                "Data Science", "Quantum Computing", "Blockchain", "Cybersecurity",
                "Game Development", "Mobile App Development", "Cloud Computing"
            ],
            books: [
                "Hands-On Machine Learning - Aurélien Géron",
                "Pattern Recognition and Machine Learning - Christopher Bishop",
                "Deep Learning - Ian Goodfellow",
                "The Elements of Statistical Learning",
                "Artificial Intelligence: A Modern Approach",
                "Python Machine Learning - Sebastian Raschka",
                "Neural Networks and Deep Learning",
                "The Master Algorithm - Pedro Domingos"
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

        this.state = {
            terminal: [],
            aiMode: 'normal', // normal, learning, creative
            theme: 'matrix' // matrix, neon, cyber, retro
        };
    }

    componentDidMount() {
        this.initializeAI();
        this.startNyxDino();
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
        this.setState({ terminal: [] }, () => {
            this.showWelcomeMessage();
            this.appendTerminalRow();
        });
        this.terminal_rows = 1;
    }

    showWelcomeMessage = () => {
        const welcomeMsg = `
            <div class="mb-4 animate-pulse">
                <div class="text-center mb-4">
                    <div class="text-6xl mb-2">🦖</div>
                    <div class="text-green-400 text-2xl font-bold mb-2 animate-bounce">
                        ╔═══════════════════════════════════════╗
                        ║    🤖 NYXDINO AI v2.0 INITIALIZED    ║
                        ╚═══════════════════════════════════════╝
                    </div>
                </div>
                <div class="bg-gray-800 border border-green-400 rounded-lg p-4 mb-4">
                    <div class="text-cyan-300 text-lg font-bold mb-2">🧠 Advanced AI Assistant Activated!</div>
                    <div class="text-blue-300 mb-2">Hey there! I'm NyxDino, your super-intelligent AI buddy! 🚀</div>
                    <div class="text-yellow-300 mb-2">I know EVERYTHING about Dino - the AI wizard from Delhi! ✨</div>
                    <div class="text-purple-300 mb-3">🔥 Powered by Machine Learning & Neural Networks!</div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="bg-blue-900 border border-blue-400 rounded p-3">
                        <div class="text-blue-300 font-bold mb-2">🎯 Quick Fire Questions:</div>
                        <div class="text-gray-300 text-sm">
                            <div>• "Who is Dino?"</div>
                            <div>• "What AI projects has he built?"</div>
                            <div>• "Where does he work?"</div>
                            <div>• "Show me his skills"</div>
                        </div>
                    </div>
                    <div class="bg-purple-900 border border-purple-400 rounded p-3">
                        <div class="text-purple-300 font-bold mb-2">🚀 Advanced Queries:</div>
                        <div class="text-gray-300 text-sm">
                            <div>• "Analyze his expertise"</div>
                            <div>• "Compare his projects"</div>
                            <div>• "Predict his future"</div>
                            <div>• "Rate his skills"</div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-green-900 border border-green-400 rounded p-3 mb-4">
                    <div class="text-green-300 font-bold mb-2">🤖 AI Features Enabled:</div>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-green-600 px-2 py-1 rounded text-xs">Machine Learning</span>
                        <span class="bg-blue-600 px-2 py-1 rounded text-xs">Pattern Recognition</span>
                        <span class="bg-purple-600 px-2 py-1 rounded text-xs">Sentiment Analysis</span>
                        <span class="bg-yellow-600 px-2 py-1 rounded text-xs">Smart Responses</span>
                        <span class="bg-pink-600 px-2 py-1 rounded text-xs">Learning Engine</span>
                    </div>
                </div>
                
                <div class="text-center">
                    <div class="text-cyan-400 font-bold">💬 Type 'help' for commands or just ask me anything!</div>
                    <div class="text-gray-400 text-sm mt-1">I get smarter with every conversation! 🧠✨</div>
                </div>
                <div class="border-t border-gray-600 mt-4 pt-2"></div>
            </div>
        `;

        $('#nyxdino-body').append(welcomeMsg);
    }

    appendTerminalRow = () => {
        let terminal = [...this.state.terminal];
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 1;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-6 items-center">
                    <div className="flex items-center">
                        <div className="text-green-400 font-bold">🦖 NyxDino</div>
                        <div className="text-white mx-1 font-medium">:</div>
                        <div className="text-cyan-400 font-bold">AI-Brain</div>
                        <div className="text-white mx-1 font-medium">{'>'}</div>
                        <div className="text-yellow-400 mr-2">$</div>
                    </div>
                    <div className="bg-transparent relative flex-1 overflow-hidden" onClick={() => this.focusCursor(id)}>
                        <span id={`show-${id}`} className="float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider text-white"></span>
                        <div id={`cursor-${id}`} className="float-left mt-1 w-2 h-4 bg-green-400 rounded animate-pulse"></div>
                        <input
                            id={`terminal-input-${id}`}
                            data-row-id={id}
                            onKeyDown={this.checkKey}
                            onBlur={() => this.unFocusCursor(id)}
                            className="absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent"
                            spellCheck={false}
                            autoFocus={true}
                            autoComplete="off"
                            type="text"
                            placeholder="Ask me anything about Dino..."
                        />
                    </div>
                </div>
                <div id={`row-result-${id}`} className="my-3 font-normal"></div>
            </React.Fragment>
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
        else {
            // Use AI to generate response (now async)
            response = await this.generateAIResponse(lowerQuery);
        }

        document.getElementById(`row-result-${rowId}`).innerHTML = response;
        this.appendTerminalRow();
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
        const modes = ['normal', 'learning', 'creative'];
        const currentIndex = modes.indexOf(this.state.aiMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        const newMode = modes[nextIndex];

        this.setState({ aiMode: newMode });

        return `<div class="text-purple-300">
            <div class="text-xl font-bold mb-2">🤖 AI Mode Switched!</div>
            <div class="bg-purple-900 border border-purple-400 rounded p-3">
                <div class="text-yellow-300">New Mode: <span class="font-bold text-green-400">${newMode.toUpperCase()}</span></div>
                <div class="mt-2 text-gray-300">
                    ${newMode === 'learning' ? '🧠 Learning mode: I\'ll provide more detailed explanations!' :
                newMode === 'creative' ? '🎨 Creative mode: Expect more fun and creative responses!' :
                    '⚡ Normal mode: Balanced and efficient responses!'}
                </div>
            </div>
        </div>`;
    }

    getAnalytics = () => {
        const totalQueries = this.conversationHistory.length;
        const topQueries = Array.from(this.mlEngine.popularQuestions.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const sentimentCounts = {};
        this.conversationHistory.forEach(conv => {
            sentimentCounts[conv.sentiment] = (sentimentCounts[conv.sentiment] || 0) + 1;
        });

        return `<div class="text-blue-300">
            <div class="text-xl font-bold mb-3">📊 NyxDino Analytics Dashboard</div>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-900 border border-blue-400 rounded p-3">
                    <div class="text-cyan-300 font-bold mb-2">📈 Statistics</div>
                    <div class="text-sm">
                        <div>Total Queries: <span class="text-yellow-300">${totalQueries}</span></div>
                        <div>Learning Data Points: <span class="text-green-300">${this.mlEngine.learningData.length}</span></div>
                        <div>Pattern Recognition: <span class="text-purple-300">${this.mlEngine.patterns.size} patterns</span></div>
                    </div>
                </div>
                <div class="bg-green-900 border border-green-400 rounded p-3">
                    <div class="text-green-300 font-bold mb-2">🔥 Popular Topics</div>
                    <div class="text-sm">
                        ${topQueries.map(([query, count]) =>
            `<div>${query}: <span class="text-yellow-300">${count}x</span></div>`
        ).join('')}
                    </div>
                </div>
            </div>
            <div class="mt-3 text-gray-300 text-sm">
                💡 I'm getting smarter with every conversation!
            </div>
        </div>`;
    }

    getHelpMessage = () => {
        return `
            <div class="text-cyan-300">
                <div class="text-2xl font-bold mb-3">🦖 NyxDino AI Command Center</div>
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div class="bg-gray-800 border border-cyan-400 rounded p-3">
                        <div class="text-yellow-300 font-bold mb-2">🎮 System Commands:</div>
                        <div class="text-gray-300">
                            <div>• <span class="text-green-400">help</span> - Show this guide</div>
                            <div>• <span class="text-green-400">clear</span> - Clear terminal</div>
                            <div>• <span class="text-green-400">exit</span> - Say goodbye</div>
                            <div>• <span class="text-green-400">stats</span> - View analytics</div>
                            <div>• <span class="text-green-400">ai mode</span> - Switch AI mode</div>
                        </div>
                    </div>
                    <div class="bg-gray-800 border border-green-400 rounded p-3">
                        <div class="text-yellow-300 font-bold mb-2">🧠 Ask About Dino:</div>
                        <div class="text-gray-300">
                            <div>• Personal info & background</div>
                            <div>• Education at DTU</div>
                            <div>• AI/ML skills & expertise</div>
                            <div>• Current job & projects</div>
                            <div>• Social media profiles</div>
                            <div>• Books & learning resources</div>
                        </div>
                    </div>
                    <div class="bg-gray-800 border border-purple-400 rounded p-3">
                        <div class="text-yellow-300 font-bold mb-2">🚀 Advanced Queries:</div>
                        <div class="text-gray-300">
                            <div>• "Analyze his skills"</div>
                            <div>• "Compare projects"</div>
                            <div>• "Rate expertise"</div>
                            <div>• "Predict future"</div>
                            <div>• "Show achievements"</div>
                            <div>• "Tech stack analysis"</div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <div class="text-purple-300 font-bold">🤖 Powered by Advanced AI & Machine Learning!</div>
                    <div class="text-gray-400">Ask me anything - I learn and improve with every conversation!</div>
                </div>
            </div>
        `;
    }

    getExitMessage = () => {
        const personality = this.responsePersonality[Math.floor(Math.random() * this.responsePersonality.length)];
        return `<div class="text-center">
            <div class="text-6xl mb-3">🦖</div>
            <div class="text-red-400 text-xl font-bold mb-2">Thanks for chatting with NyxDino AI!</div>
            <div class="text-yellow-300 mb-2">That was ${personality}! 🚀</div>
            <div class="text-green-300 mb-2">I learned ${this.conversationHistory.length} new things from our conversation!</div>
            <div class="text-purple-300">Come back soon to explore more about Dino! ✨</div>
            <div class="text-gray-400 mt-2 text-sm">🧠 NyxDino AI - Always Learning, Always Growing</div>
        </div>`;
    }

    // Helper: Simulate an async API/DB call (replace with real API if needed)
    fetchFromKnowledgeBase = async (query) => {
        // Simulate DB/API latency
        await new Promise(res => setTimeout(res, 200));
        // Simulated DB/ML response
        const db = {
            "personal info": `
            <div class="text-xl font-bold mb-2">🦖 Dino's Personal Info</div>
            <div class="text-yellow-300">Name: Dino<br/>Location: Delhi, India<br/>Age: 19<br/>Personality: ${this.personalInfo.personality}</div>
        `,
            "predict his future": `
            <div class="text-xl font-bold mb-2">🔮 Dino's Future (AI Prediction)</div>
            <div class="text-green-300">Based on Dino's rapid progress, passion for AI, and strong project portfolio, my neural network predicts:<br/>
            <ul class="list-disc ml-6">
                <li>He will lead innovative AI startups 🚀</li>
                <li>Publish research in top AI journals 📚</li>
                <li>Speak at global tech conferences 🌍</li>
                <li>Inspire the next generation of AI devs 🤖</li>
            </ul>
            <div class="mt-2 text-cyan-300">Want a more detailed prediction? Ask about a specific field!</div>
            </div>
        `
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

        // 1. Try DB/API/ML knowledge base first
        const dbAnswer = await this.fetchFromKnowledgeBase(query);
        if (dbAnswer) {
            return `<div class="${responseStyle.color}">${dbAnswer}</div>`;
        }

        // 2. Pattern-based Q&A (expandable)
        const qaMap = [
            {
                keywords: ['hello', 'hi', 'hey', 'yo', 'sup'],
                answer: `<div class="text-xl font-bold mb-2">👋 Hey there! I'm NyxDino AI.</div>
                <div class="text-cyan-300">Ask me anything about Dino, AI, projects, or tech!</div>`
            },
            {
                keywords: ['who is dino', 'about dino', 'dino'],
                answer: `<div class="text-xl font-bold mb-2">🦖 Meet Dino!</div>
                <div class="text-yellow-300">Dino is a passionate AI/ML developer from Delhi, currently in 2nd year BTech (AI) at DTU. He works part-time as a Junior Software Developer and loves building cool AI projects!</div>
                <div class="mt-2 text-cyan-300">Want to know about his skills, projects, or social links? Just ask!</div>`
            },
            {
                keywords: ['education', 'study', 'school', 'college', 'dtu'],
                answer: `<div class="text-xl font-bold mb-2">🎓 Education</div>
                <div class="text-green-300">Dino completed 12th grade and is currently pursuing BTech in Artificial Intelligence at DTU (Delhi Technological University), 2nd year.</div>`
            },
            {
                keywords: ['work', 'job', 'occupation', 'profession', 'developer'],
                answer: `<div class="text-xl font-bold mb-2">💼 Work Experience</div>
                <div class="text-blue-300">Dino is working as a Junior Software Developer (part-time), focusing on full-stack development and AI integration.</div>`
            },
            {
                keywords: ['skills', 'expertise', 'tech stack', 'languages'],
                answer: `<div class="text-xl font-bold mb-2">🧠 Skills & Tech Stack</div>
                <div class="text-yellow-300">AI/ML: ${this.personalInfo.skills.slice(0, 5).join(', ')}...</div>
                <div class="text-cyan-300">Languages: ${this.personalInfo.languages.join(', ')}</div>
                <div class="text-purple-300">Frameworks: ${this.personalInfo.frameworks.join(', ')}</div>`
            },
            {
                keywords: ['project', 'projects', 'portfolio'],
                answer: `<div class="text-xl font-bold mb-2">🚀 Projects</div>
                <div class="text-green-300">${this.personalInfo.projects.slice(0, 5).map(p => `• ${p}`).join('<br/>')}</div>
                <div class="mt-2 text-cyan-300">See more on <a href="${this.personalInfo.social.github}" class="underline text-blue-400" target="_blank">GitHub</a> or <a href="${this.personalInfo.social.portfolio}" class="underline text-blue-400" target="_blank">Portfolio</a>.</div>`
            },
            {
                keywords: ['achievements', 'awards', 'accomplishments', 'trophies'],
                answer: `<div class="text-xl font-bold mb-2">🏆 Achievements</div>
                <div class="text-yellow-300">${this.personalInfo.achievements.map(a => `• ${a}`).join('<br/>')}</div>`
            },
            {
                keywords: ['social', 'connect', 'links', 'github', 'linkedin', 'twitter', 'youtube', 'blog'],
                answer: `<div class="text-xl font-bold mb-2">🌐 Social Links</div>
                <div class="text-blue-300">GitHub: <a href="${this.personalInfo.social.github}" class="underline" target="_blank">${this.personalInfo.social.github}</a></div>
                <div class="text-blue-300">LinkedIn: <a href="${this.personalInfo.social.linkedin}" class="underline" target="_blank">${this.personalInfo.social.linkedin}</a></div>
                <div class="text-blue-300">Twitter: <a href="${this.personalInfo.social.twitter}" class="underline" target="_blank">${this.personalInfo.social.twitter}</a></div>
                <div class="text-blue-300">YouTube: <a href="${this.personalInfo.social.youtube}" class="underline" target="_blank">${this.personalInfo.social.youtube}</a></div>
                <div class="text-blue-300">Blog: <a href="${this.personalInfo.social.blog}" class="underline" target="_blank">${this.personalInfo.social.blog}</a></div>
                <div class="text-blue-300">Portfolio: <a href="${this.personalInfo.social.portfolio}" class="underline" target="_blank">${this.personalInfo.social.portfolio}</a></div>`
            },
            {
                keywords: ['books', 'reading', 'read', 'book'],
                answer: `<div class="text-xl font-bold mb-2">📚 Favorite Books</div>
                <div class="text-green-300">${this.personalInfo.books.map(b => `• ${b}`).join('<br/>')}</div>`
            },
            {
                keywords: ['interests', 'hobbies', 'passion', 'like'],
                answer: `<div class="text-xl font-bold mb-2">🎯 Interests</div>
                <div class="text-yellow-300">${this.personalInfo.interests.map(i => `• ${i}`).join('<br/>')}</div>`
            }
        ];

        // 3. Try direct keyword match
        for (const qa of qaMap) {
            if (this.containsKeywords(query, qa.keywords)) {
                return `<div class="${responseStyle.color}">${qa.answer}</div>`;
            }
        }

        // 4. ML-inspired: Fuzzy match using most similar question
        let bestMatch = null;
        let bestScore = 0;
        for (const qa of qaMap) {
            for (const keyword of qa.keywords) {
                const score = this.similarityScore(query, keyword);
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = qa;
                }
            }
        }
        if (bestScore > 0.5) { // threshold for "close enough"
            return `<div class="${responseStyle.color}">
                <div class="text-yellow-300 mb-2">🤖 I guessed your intent using my ML engine!</div>
                ${bestMatch.answer}
            </div>`;
        }

        // 5. Fallback/default
        return `<div class="${responseStyle.color}">
        <div class="text-xl font-bold mb-3">🤖 NyxDino AI Brain Processing...</div>
        <div class="bg-gray-800 border border-cyan-400 rounded p-3">
            <div class="text-cyan-300 mb-2">🧠 I didn't catch that specific query, but here's what I can help with:</div>
            <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <div class="text-yellow-300 font-bold">💡 Popular Topics:</div>
                    <div class="text-gray-300">
                        <div>• Dino's AI/ML expertise</div>
                        <div>• His projects & achievements</div>
                        <div>• Education at DTU</div>
                        <div>• Work experience</div>
                    </div>
                </div>
                <div>
                    <div class="text-purple-300 font-bold">🚀 Try Asking:</div>
                    <div class="text-gray-300">
                        <div>• "Analyze his skills"</div>
                        <div>• "Show his projects"</div>
                        <div>• "Predict his future"</div>
                        <div>• "Rate his expertise"</div>
                    </div>
                </div>
            </div>
            <div class="mt-3 text-center">
                <div class="text-green-300 font-bold">💭 ML Insight: ${this.getMLInsight()}</div>
            </div>
        </div>
    </div>`;
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
            "Most users ask about Dino's AI projects first!",
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

    containsKeywords = (query, keywords) => {
        const lower = query.toLowerCase();
        return keywords.some(keyword => lower.includes(keyword.toLowerCase()));
    }

    render() {
        return (
            <div className={`h-full w-full bg-gray-900 text-white text-sm font-mono overflow-y-auto p-4 ${this.state.theme === 'matrix' ? 'bg-black' : 'bg-gray-900'}`} id="nyxdino-body">
                {this.state.terminal}
            </div>
        );
    }
}

export default NyxDino;

// Export function for the apps config
export const displayNyxDino = () => {
    return <NyxDino />;
};

