import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vfzmxnvvewfnbfoioqlw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Client Supabase initialisé !', supabase);


async function fetchbirthday() {
  const { data, error } = await supabase
    .from('birthday') // Remplace 'tasks' par le nom de ta table
    .select('*'); // '*' pour sélectionner toutes les colonnes

  if (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    return;
  }

  if (data) {
    console.log('Tâches récupérées :', data);
    // Tu peux maintenant utiliser les données récupérées
  }
}

fetchTasks();

async function addbirthdayPerson(name, useername, date_of_birth) {
  const { data, error } = await supabase
    .from('birthday')
    .insert([
      { name: name, username: username, date_of_birth: date_of_birth }, 
    ]);

  if (error) {
    console.error('Erreur lors de l\'ajout de la tâche :', error);
    return;
  }

  if (data) {
    console.log('Personne ajouté avec succès :', data);
    // Tu peux gérer la réponse ici
  }
}

addTask('', '');