export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  skills: string[];
};

export type Project = {
  title: string;
  description: string;
  bullets: string[];
  skills: string[];
};

export const profile = {
  name: "Karan Bhise",
  headline: "Artificial Intelligence & Data Science Engineer",
  intro: "AI and Data Science engineering graduate focused on machine learning, data analysis, computer vision, and cloud fundamentals.",
  education: "Bachelor of Engineering in Artificial Intelligence and Data Science — Vidya Pratishthan’s Kamalnayan Bajaj Institute of Engineering and Technology, Baramati, Pune (2024)",
  skills: {
    Programming: ["Python", "SQL"],
    "ML / AI": ["TensorFlow", "Keras", "Scikit-learn", "Supervised Learning", "Unsupervised Learning", "Neural Networks", "CNN"],
    "Data Analysis": ["Pandas", "NumPy", "Matplotlib", "Data Preprocessing", "Feature Engineering"],
    Cloud: ["Microsoft Azure", "Virtual Machines", "Cloud Storage", "Networking"],
    Tools: ["VS Code", "Jupyter Notebook", "Power BI", "Git"],
    Core: ["Problem Solving", "Algorithm Design", "Data Visualization", "Model Optimization"],
  },
  experience: [
    {
      role: "Machine Learning & AI Intern",
      company: "Knowledge Solutions India",
      period: "Feb 2021 – Apr 2021 · Remote",
      bullets: [
        "Completed a 6-week training program in machine learning and artificial intelligence.",
        "Worked with supervised and unsupervised algorithms including Decision Trees, SVM and Neural Networks.",
        "Practiced preprocessing, model training, evaluation, optimization, model selection and hyperparameter tuning."
      ],
      skills: ["Machine Learning", "SVM", "Decision Trees", "Neural Networks", "Hyperparameter Tuning"]
    },
    {
      role: "Cloud Computing Intern (AZ-900)",
      company: "KasNet Technologies Pvt. Ltd.",
      period: "Jan 2023 – Mar 2023 · Remote",
      bullets: [
        "Completed Microsoft Azure Fundamentals-focused internship training.",
        "Worked with cloud infrastructure concepts including virtual machines, storage and networking.",
        "Learned cloud deployment models and service management fundamentals."
      ],
      skills: ["Microsoft Azure", "VMs", "Cloud Storage", "Networking", "AZ-900"]
    }
  ] as Experience[],
  projects: [
    {
      title: "Ball Bearing Defect Detection using CNN Model",
      description: "Computer vision project using a CNN model for defect classification/detection in ball bearings.",
      bullets: ["Applied image preprocessing and data augmentation.", "Focused on improving product-quality inspection and reducing manufacturing defects.", "Research paper published on the project."],
      skills: ["CNN", "Computer Vision", "Image Preprocessing", "Data Augmentation"]
    },
    {
      title: "Student Grade Prediction using Machine Learning",
      description: "Machine learning project comparing multiple regression/tree-based approaches for student grade prediction.",
      bullets: ["Used Linear Regression, Random Forest and XGBoost.", "Handled missing-value imputation, feature scaling and categorical encoding.", "Applied feature engineering and model comparison."],
      skills: ["Python", "Scikit-learn", "Linear Regression", "Random Forest", "XGBoost"]
    }
  ] as Project[],
  certifications: [
    "Microsoft Certified: Azure Fundamentals (AZ-900)",
    "MTA: Introduction to Programming Using Python – Microsoft Technology Associate (2021)",
    "Zensar Employability Skills Development Training Program",
    "Corporate Mentorship Program – Viosa Learning"
  ],
  publication: "Research Publication: Ball Bearing Defect Detection using CNN Model"
};
