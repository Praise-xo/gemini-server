const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai')
const generativeAI = new GoogleGenerativeAI("AIzaSyBeVUNfTWGe3SEkVAorGXVpFmYifbj4NUs")


exports.sendResponse = catchAsync(async (req, res, next) => {
    try {

        const { history, message } = req.body


        if (!history && message) {
            return next(new AppError("Please provide history and message", 400))
        }

        const model = generativeAI.getGenerativeModel({ model: "gemini-pro" })

        const chat = model.startChat({
            History: history,
        })

        const msg = message

        const result = await chat.sendMessage(msg)

        const response = await result.response;

        const text = response.text()

        res.status(200).json(text)
    } catch (error) {

        return next(new AppError(error.message, 500))

    }
})

