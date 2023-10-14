import mongoose from "mongoose";

const WriterSchema = new mongoose.Schema({
 authorName:{
    type: String,
    required: true
 },
 authorImage:{
    type: String,
    required: true
 },
 authorBiography: {
    type: String,
    required: true
 },
 bookTitle:{
    type: String,
    required: true
 },
 bookImage: {
    type: String,
    required: true
 },
 bookInfo: {
    type: String,
    required: true
 },
 bookURL: {
    type: String,
    required: true
 }
});

const Writer = mongoose.model('Writer', WriterSchema);

export default Writer;