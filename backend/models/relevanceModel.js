import db from '../config/supabaseClient.js';

class RelevanceModel {
    static async getAllRelevances() {
        const { data, error } = await db.from('relevancia').select('*');
        if (error) throw error;
        return data;
    }
}

export default RelevanceModel;