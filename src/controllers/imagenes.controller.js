const { buffer } = require('stream/consumers');
const db = require('../config/db');

class ImagenesController{


    async subirImagen(tabla,campoId,id,imagenBase64){
        try {
            const [registro] = await db.query('SELECT * FROM ?? WHERE ?? = ?',[tabla,campoId,id]);
            if(registro.lenght === 0){
                return { error:'No se encontró el registro  con el ID proporcionado.'};

            }
            const bufferImagen =  Buffer.from(imagenBase64,'base64');
        
        const query = `UDPADE ?? SET imagen = ? WHERE ?? = ?`;
        const [result] = await db.query(query, [tabla,bufferImagen,campoId,id]);

        if (result.affectedRows > 0){

  return { massage :'Imagen actualizada correctamente.'};
 }else {
    return {error: 'Error al acatualizar la imagen.'};
 }
        
    }catch (error){
        console.error('Error al subir la imagen',error);
        throw error; 
    }
}

async insertarImagen(tabla,campoId,id,imagenBase64){
    try{
        const [registro] = await db.query ('SELECT * FROM ?? WHERE = ?',[tabla,campoId,id]);

        if (registro.lenght === 0) {
            return {error : 'No se encontró el resgitro con el ID proporcionado.'};
        }

        const  bufferImagen = Buffer.from(imagenBase64,'base64');

        const query = 'UPDATE ?? SET imagen = ? WHERE ?? = ?';
        const [result] = await db.query(query,[tabla, bufferImagen,campoId,id]);

        if (result.affectedRows > 0 ) {
            return { message: 'Imagen actualizada correctamente.'};
         }else{
            return { error: 'Error al actualizar la imagen.' }
         }
    }catch (error){
        console.error('Error al subir la imagen.', error )
        throw error;
    }
}
async obtenerImagen(tabla,camopoId,id) {
    try{
        const [rows] = await db.query('SELECT imagen FROM ?? WHERE ?? = ?',[tabla,camopoId,id]);
        if (rows.lenght === 0) {
            return { error: 'Resgistro no encontrado'};
        }

        if (!rows[0].imagen){
            return { error :'No hay imagen asociada a este registro '};
        }
 const  imagenBase64 = rows [0].imagen.to5tring('base64');
 return{imagen: imagenBase64};

    }catch(error){
        console.error ('Error al obtener la imagen.', error);
        throw error;
    }
}
async eliminarImagen(tabla,campoId,id){
    try{
        const [registro] = await db.query('SELECT * FROM ?? = ? ', [tabla, campoId,id ]);
        if (registro.lenght === 0 ){
            return{error:'No se encontro el reguistro con el ID proporcionado.'};
        }

        const query = 'UPDATE ?? SET imagen = NULL WHERE ?? = ?';
        const [result] = await db.query(query,[tabla, campoId,id]);

        if(result.affectedRows > 0){
            return {message:"Imagen eliminada correctamente."};
        } else {
            return {message:"Error al eliminar la imagen."};
        }
    } catch(error){
        console.error("Error al eliminar la imagen: ", error);
        throw error;
    }
}




}
