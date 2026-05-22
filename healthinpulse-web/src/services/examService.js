const EXAMS_KEY = "hip_exams_v7";

const initialExams = [
    {
        id: 1,
        name: "Hemograma completo",
        type: "PDF",
        category: "laboratorial",
        date: "Hoje",
        status: "Normal",
        notes: "Resultados dentro da faixa esperada.",
        preview: null,
    },
    {
        id: 2,
        name: "Eletrocardiograma",
        type: "Imagem",
        category: "cardiologico",
        date: "Ontem",
        status: "Revisar",
        notes: "Alteração leve detectada. Recomendado acompanhamento.",
        preview: null,
    },
];

export function getExams() {
    const stored = localStorage.getItem(EXAMS_KEY);

    if (!stored) {
        localStorage.setItem(EXAMS_KEY, JSON.stringify(initialExams));
        return initialExams;
    }

    return JSON.parse(stored);
}

export function saveExams(exams) {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
}

export async function addExam(file) {
    const exams = getExams();

    const fileName = file.name.toLowerCase();

    const isPdf = fileName.endsWith(".pdf");
    const isImage = /\.(png|jpg|jpeg|webp)$/i.test(fileName);

    let preview = null;

    if (isImage) {
        preview = await fileToBase64(file);
    }

    if (isPdf) {
        preview = URL.createObjectURL(file);
    }

    const newExam = {
        id: Date.now(),
        name: file.name,
        type: isPdf ? "PDF" : isImage ? "Imagem" : "Arquivo",
        category: isPdf ? "laboratorial" : isImage ? "cardiologico" : "outros",
        date: "Agora",
        status: "Pendente",
        notes: isPdf
            ? "PDF disponível para visualização nesta sessão. Em produção, será salvo no Firebase Storage."
            : "Arquivo enviado manualmente. Aguardando análise médica.",
        preview,
        temporary: isPdf,
    };

    const updated = [newExam, ...exams];

    const examsToPersist = updated.map((exam) => {
        if (exam.temporary) {
            return {
                ...exam,
                preview: null,
                temporary: false,
            };
        }

        return exam;
    });

    saveExams(examsToPersist);

    return updated;
}

export function deleteExam(examId) {
    const exams = getExams();
    const updated = exams.filter((exam) => exam.id !== examId);

    saveExams(updated);

    return updated;
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}