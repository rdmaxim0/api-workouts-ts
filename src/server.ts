import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3333;
// Middlewares
app.use(cors());
app.use(express.json());  //Ensina a API a ler e receber ficheiros JSON
// Endpoints 
app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'sucesso',
        message: 'API de Acompanhamento de Treinos Operacional!'
    });
});

// 1 - Interface: Define como o exercício será registrado
interface Workout {
    id: string;
    muscleGroup: string;
    exercise: string;
    weight: number;
    reps: number;
    date: string;
}

// 2 - Banco de Dados em Memória
const workouts: Workout[] = [];

// 3 - Rota GET: Retorna todo o histórico de treino
app.get('/api/workouts', (req: Request, res: Response) => {
    res.json(workouts);
});

//  4 - Rota POST: Recebe dados(Front-End) e grava um novo treino 
app.post('/api/workouts/', (req: Request, res: Response) => {
    // Extraindo dados da ficha de treino
    const  {muscleGroup, exercise, weight, reps} = req.body;
    // Criamos o novo objeto respeitando a interface
    const newWorkout: Workout = {
        id: Date.now().toString(),
        muscleGroup,
        exercise,
        weight,
        reps,
        date: new Date().toISOString()
    };
    // Guardamos em nosso Array
    workouts.push(newWorkout);
    // Devolvemos o status 201 e o registro gravado
    res.status(201).json({
        message: 'Registrado com Sucesso!',
        workout: newWorkout
    });
});

// 5 - Rota PUT: Atuliza um treino existente
app.put('/api/workouts/:id', (req: Request, res: Response) => {
    const { id } = req.params; // Extrai o ID do URL
    const {muscleGroup, exercise, weight, reps} = req.body;

    const workoutIndex = workouts.findIndex(w => w.id === id);

    if (workoutIndex === -1) {
        return res.status(404).json({ error: 'Treino não encontrsdo.'}); 
    } 

    workouts[workoutIndex] = {
        ...workouts[workoutIndex],
        muscleGroup: muscleGroup || workouts[workoutIndex].muscleGroup,
        exercise: exercise || workouts[workoutIndex].exercise,
        weight: weight !== undefined ? weight : workouts[workoutIndex].weight,
        reps: reps !== undefined ? reps : workouts[workoutIndex].reps
    }

    res.json({
        message: 'Treino Atializado com Sucesso!',
        workout: workouts[workoutIndex]
    });
});

// 6 - Rota DELETE: Remove um treino do histórico.
app.delete('/api/workouts/:id', (req: Request, res: Response) => {
    const {id} = req.params;

    const workoutIndex = workouts.findIndex( w => w.id === id );

    if(workoutIndex === -1) {
        return res.status(404).json({ error: 'Treino não encontrado.'});
    }

    workouts.splice(workoutIndex, 1);

    res.json({ message: 'Treino apagado do histórico.'});
});







// Inicia o Servidor
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});