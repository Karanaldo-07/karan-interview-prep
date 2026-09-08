export type InterviewQuestion = {
  id: string;
  category: string;
  question: string;
  answer: string;
  points: string[];
};

export const interviewCategories = [
  "All",
  "HR",
  "Technical",
  "Projects",
  "Internships",
  "Certifications",
  "Resume",
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "hr-1",
    category: "HR",
    question: "Tell me about yourself.",
    answer:
      "I am a Bachelor of Engineering graduate in Artificial Intelligence and Data Science. My core interests are machine learning, data analysis, computer vision, and cloud fundamentals. I have practical exposure through machine learning and AI training as well as a Microsoft Azure Fundamentals-focused internship. I have also worked on projects including ball bearing defect detection using CNN and student grade prediction using machine learning. I am looking for an opportunity where I can apply these skills, keep learning, and contribute to real-world problems.",
    points: ["Education", "Core technical areas", "Internship exposure", "Projects", "Career goal"],
  },
  {
    id: "hr-2",
    category: "HR",
    question: "Why should we hire you?",
    answer:
      "I bring a foundation across machine learning, data analysis, computer vision, and Azure fundamentals, along with hands-on project and internship exposure. I am comfortable learning new concepts, breaking problems into steps, and working through model preparation, evaluation, and optimization. I can contribute with my existing technical foundation while continuing to grow according to the team's requirements.",
    points: ["Relevant foundation", "Hands-on projects", "Problem solving", "Learning mindset"],
  },
  {
    id: "tech-1",
    category: "Technical",
    question: "What is supervised learning?",
    answer:
      "Supervised learning is a machine learning approach in which a model learns from labeled training data. Each training example has input features and a known target. The model learns the relationship between them and uses that learned relationship to make predictions on new data. Examples from my resume include Decision Trees, SVM, Linear Regression, and Random Forest.",
    points: ["Labeled data", "Input features + target", "Learning a mapping", "Prediction on unseen data"],
  },
  {
    id: "tech-2",
    category: "Technical",
    question: "What is the difference between supervised and unsupervised learning?",
    answer:
      "Supervised learning uses labeled data and learns to predict a known target, while unsupervised learning works with data without target labels and tries to discover useful patterns or structure. The choice depends on the problem and the data available.",
    points: ["Supervised → labeled", "Unsupervised → unlabeled", "Prediction vs pattern discovery"],
  },
  {
    id: "tech-3",
    category: "Technical",
    question: "Why are preprocessing and feature engineering important?",
    answer:
      "Preprocessing prepares raw data so that a model can use it effectively. It can include handling missing values, scaling numerical features, and encoding categorical variables. Feature engineering creates or transforms useful inputs from the available data. In my student grade prediction project, I used missing-value imputation, feature scaling, categorical encoding, and feature engineering before comparing models.",
    points: ["Missing values", "Scaling", "Categorical encoding", "Useful derived features"],
  },
  {
    id: "project-1",
    category: "Projects",
    question: "Explain your Ball Bearing Defect Detection project.",
    answer:
      "It is a computer vision project that uses a CNN model for defect classification or detection in ball bearings. The workflow involved image preprocessing and data augmentation before applying the CNN approach. The project was focused on improving product-quality inspection and reducing manufacturing defects. A research paper was also published on the project.",
    points: ["Problem: bearing inspection", "Approach: CNN", "Preprocessing + augmentation", "Quality inspection", "Research publication"],
  },
  {
    id: "project-2",
    category: "Projects",
    question: "Explain your Student Grade Prediction project.",
    answer:
      "The project predicts student grades using machine learning. I compared Linear Regression, Random Forest, and XGBoost. Before modeling, I handled missing values through imputation, applied feature scaling and categorical encoding, and performed feature engineering. The goal was to compare different approaches and identify a suitable model for the prediction problem.",
    points: ["Prediction problem", "Linear Regression", "Random Forest", "XGBoost", "Data preparation + comparison"],
  },
  {
    id: "intern-1",
    category: "Internships",
    question: "What did you learn during your Machine Learning & AI internship?",
    answer:
      "During the six-week training program, I worked with supervised and unsupervised machine learning concepts and algorithms including Decision Trees, SVM, and Neural Networks. I also practiced preprocessing, model training, evaluation, optimization, model selection, and hyperparameter tuning. The experience gave me exposure to the overall machine learning workflow rather than only individual algorithms.",
    points: ["6-week training", "Decision Trees + SVM", "Neural Networks", "Evaluation", "Hyperparameter tuning"],
  },
  {
    id: "intern-2",
    category: "Internships",
    question: "What did you work on during your Azure Fundamentals internship?",
    answer:
      "The internship focused on Microsoft Azure Fundamentals. I worked with concepts around virtual machines, cloud storage, and networking, and learned about cloud deployment models and service management fundamentals. This gave me a foundation for understanding how cloud infrastructure is organized and managed.",
    points: ["Azure Fundamentals", "Virtual machines", "Storage", "Networking", "Deployment models"],
  },
  {
    id: "cert-1",
    category: "Certifications",
    question: "What is AZ-900 and what did you learn from it?",
    answer:
      "AZ-900 is Microsoft Azure Fundamentals. In the context of my resume, it represents my foundation in Azure and cloud concepts, including virtual machines, storage, networking, cloud deployment models, and service management fundamentals. I use it as evidence of my foundational cloud knowledge rather than presenting myself as an advanced Azure specialist.",
    points: ["Azure fundamentals", "Cloud concepts", "Compute", "Storage", "Networking"],
  },
  {
    id: "resume-1",
    category: "Resume",
    question: "Which technical skills are you strongest in?",
    answer:
      "My resume is strongest around Python and machine learning, supported by data-analysis tools such as Pandas and NumPy. I also have exposure to TensorFlow, Keras, Scikit-learn, CNNs, computer vision, data preprocessing, feature engineering, and Azure fundamentals. I would describe my level honestly as a strong foundation with project and training exposure, and I am continuing to deepen my practical experience.",
    points: ["Python", "Machine learning", "Data analysis", "Computer vision", "Azure fundamentals"],
  },
  {
    id: "resume-2",
    category: "Resume",
    question: "How do your projects relate to your career goal?",
    answer:
      "The projects show two complementary areas I want to build on: computer vision through CNN-based defect detection and predictive machine learning through student grade prediction. Together they demonstrate my interest in applying machine learning to practical problems, preparing data, comparing models, and thinking about real-world outcomes.",
    points: ["Computer vision", "Predictive ML", "Data preparation", "Model comparison", "Practical problem solving"],
  },
];
