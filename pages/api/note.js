import dbConnect from '../../db/dbConnect'
import Notes from '../../db/notes'

dbConnect()

export default async function notes(req, res) {
  const { method } = req;
  
  if (method === "POST") {
  try {
    const { title, body} = req.body;
    const newNote = await Notes.create({title,body}).catch((err)=>{throw error});
    return res.status(201).send({message:'Note added successfully!', data:newNote})

  } catch (error) {
    return res.status(500).send({message:'SERVER_ERROR'})
  }
}
else if (method === "GET") {
  try {
    const notes = await Notes.find().sort({ updatedAt:-1 }).catch((err)=>{throw error });
    return res.status(201).send({message:'Notes fetched successfully!', data:notes})

  } catch (error) {
    return res.status(500).send({message:'SERVER_ERROR'})
  }
}
else if (method === "DELETE") {
  try {
    const { id } = req.query;
    await Notes.findByIdAndDelete({ _id: id }).catch((err)=>{throw error });
    return res.status(200).send({message:'Note deleted successfully!'})

  } catch (error) {
    return res.status(500).send({message:'SERVER_ERROR'})
  }
}
}
