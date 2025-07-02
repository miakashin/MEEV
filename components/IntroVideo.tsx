'use client'

import React, { useEffect, useState, useRef } from 'react'

export default function IntroVideo() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [videoAvailable, setVideoAvailable] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current;
    let playPromise: Promise<void> | null = null;
    
    const handleEnded = () => {
      setIsVisible(false);
    };
    
    const handleError = () => {
      console.error('Error loading video');
      setVideoAvailable(false);
      setIsVisible(false);
    };
    
    const handlePlay = async () => {
      try {
        if (video) {
          video.muted = false;
          playPromise = video.play();
          
          if (playPromise !== undefined) {
            await playPromise.catch(error => {
              if (error.name === "NotAllowedError") {
                video.muted = true;
                setIsMuted(true);
                return video.play();
              }
              throw error;
            });
          }
        }
      } catch (error) {
        console.error('Error playing video:', error);
        setVideoAvailable(false);
        setIsVisible(false);
      }
    };
    
    if (video) {
      video.addEventListener('ended', handleEnded);
      video.addEventListener('error', handleError);
      handlePlay();
    }
    
    return () => {
      if (video) {
        // Cancel any ongoing animations
        video.style.animation = 'none';
        
        // Pause and reset the video
        video.pause();
        video.currentTime = 0;
        
        // Remove event listeners
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
        
        // Clean up any pending play promises
        if (playPromise) {
          playPromise
            .then(() => {
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            })
            .catch(() => {});
        }
        
        // Reset the video element
        if (video.parentNode) {
          video.src = '';
          video.load();
        }
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (!isVisible || !videoAvailable) return null

  return (
    <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        autoPlay
        onError={() => {
          setVideoAvailable(false);
          setIsVisible(false);
        }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </div>
  )
} 