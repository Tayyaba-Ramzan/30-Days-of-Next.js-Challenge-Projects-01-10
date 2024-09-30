'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'

type ConfettiProps = {
  width: number
  height: number
}

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

// Define color arrays for candles, balloons, and confetti
const candleColors = ['#FF0000', '#00FF00', '#0000FF', '#FF6347', '#32CD32']
const balloonColors = ['#FF0000', '#00FF00', '#0000FF', '#FF6347', '#32CD32']
const confettiColors = ['#FF0000', '#00FF00', '#0000FF', '#FF6347', '#32CD32']

export default function BirthdayWish() {
  // State variables
  const [candlesLit, setCandlesLit] = useState<number>(0)
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0)
  const [showConfetti, setShowConfetti] = useState<boolean>(false) // 
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 }) 
  const [celebrating, setCelebrating] = useState<boolean>(false) // 

 
  const totalCandles: number = 6 
  const totalBalloons: number = 6 

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])

  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  // Function to start celebration
  const celebrate = () => {
    setCelebrating(true)
    setShowConfetti(true)
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 500)
  }

  return (
    // Main container
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated wrapper for the card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >

        <Card className="mt-5 mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-4 border-yellow-400 rounded-3xl bg-transparent">
    
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-yellow-400">Happy 19th BirthDay!</CardTitle>
            <CardDescription className="text-3xl font-semibold text-purple-600 italic">Tayyaba Ramzan</CardDescription>
            <p className="text-lg text-green-500 font-semibold">December 9</p>
          </CardHeader>
      
          <CardContent className="space-y-6 text-center">
          
            <div>
              <h3 className="text-lg font-semibold text-red-500 mb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-2">
            
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                  
                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                
                        <FaBirthdayCake
                          className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                
                      <FaBirthdayCake
                        className={`w-8 h-8 text-white transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
        
            <div>
              <h3 className="text-lg font-semibold text-pink-500 mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-2">
        
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
             
                    <GiBalloons
                      className={`w-8 h-8 cursor-pointer hover:scale-110`}
                      style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              className="bg-red-800 text-white hover:bg-purple-800 transition-all duration-300 rounded-3xl"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {/* Confetti component */}
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  )
}