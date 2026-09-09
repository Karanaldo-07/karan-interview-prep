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
  name: "KARAN BHISE",
  email: "karanbhise126@gmail.com",
  phone: "+91-9529657450",
  linkedin: "https://linkedin.com/in/karan-bhise-a422951a5",
  headline: "Artificial Intelligence & Data Science Engineer",
  intro: "AI and Data Science engineering graduate focused on machine learning, data analysis, computer vision, and cloud fundamentals.",
  education: "Bachelor of Engineering in Artificial Intelligence and Data Science",
  institution: "Vidya Pratishthan’s Kamalnayan Bajaj Institute of Engineering and Technology, Baramati, Pune",
  graduationYear: "2024",
  skills: {
    "Programming Languages": ["Python", "SQL"],
    "Machine Learning & AI": ["TensorFlow", "Keras", "Scikit-learn", "Supervised Learning", "Unsupervised Learning", "Neural Networks", "CNN"],
    "Data Analysis": ["Pandas", "NumPy", "Matplotlib", "Data Preprocessing", "Feature Engineering"],
    "Cloud Computing": ["Microsoft Azure (AZ-900 Certified)", "Virtual Machines", "Cloud Storage", "Networking"],
    "Tools & Platforms": ["VS Code", "Jupyter Notebook", "Power BI", "Git"],
    "Core Competencies": ["Problem Solving", "Algorithm Design", "Data Visualization", "Model Optimization"]
  },
  experience: [
    {
      role: "Machine Learning & AI Intern",
      company: "Knowledge Solutions India",
      period: "February 2021 – April 2021",
      bullets: [
        "Completed intensive 6-week training program in Machine Learning and Artificial Intelligence.",
        "Implemented supervised and unsupervised learning algorithms including Decision Trees, SVM, and Neural Networks.",
        "Conducted data preprocessing, model training, and evaluation to optimize algorithm performance.",
        "Developed hands-on expertise in model selection and hyperparameter tuning techniques."
      ],
      skills: ["Machine Learning", "Decision Trees", "SVM", "Neural Networks", "Hyperparameter Tuning"]
    },
    {
      role: "Cloud Computing Intern (AZ-900)",
      company: "KasNet Technologies Pvt. Ltd.",
      period: "January 2023 – March 2023",
      bullets: [
        "Completed Microsoft Azure Fundamentals internship, gaining expertise in cloud computing concepts and Azure services.",
        "Deployed and managed real-world cloud infrastructure projects including virtual machines, storage solutions, and networking configurations.",
        "Acquired practical knowledge of cloud deployment models and service management."
      ],
      skills: ["Microsoft Azure", "Virtual Machines", "Cloud Storage", "Networking", "AZ-900"]
    }
  ] as Experience[],
  projects: [
    {
      title: "Ball Bearing Defect Detection using CNN Model",
      description: "Designed and developed a CNN model to classify and detect defects in ball bearings with high accuracy.",
      bullets: [
        "Implemented image preprocessing and data augmentation techniques to enhance model performance.",
        "Achieved significant improvement in product quality detection, reducing manufacturing defects.",
        "Published research paper on the methodology and results."
      ],
      skills: ["CNN", "Computer Vision", "Image Preprocessing", "Data Augmentation"]
    },
    {
      title: "Student Grade Prediction using Machine Learning",
      description: "Built predictive models using Linear Regression, Random Forest, and XGBoost to forecast student academic performance.",
      bullets: [
        "Performed comprehensive data preprocessing including missing value imputation, feature scaling, and categorical encoding.",
        "Conducted feature engineering and model comparison to optimize prediction accuracy."
      ],
      skills: ["Linear Regression", "Random Forest", "XGBoost", "Feature Engineering"]
    }
  ] as Project[],
  certifications: [
    "Microsoft Certified: Azure Fundamentals (AZ-900) – Cloud computing and Azure services",
    "MTA: Introduction to Programming Using Python – Microsoft Technology Associate (2021)",
    "Zensar Employability Skills Development Training Program – Professional development",
    "Corporate Mentorship Program – Viosa Learning"
  ],
  publication: "Research Publication: Ball Bearing Defect Detection using CNN Model"
};
