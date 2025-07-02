'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';

export default function IntroVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cleanupRef = useRef<() => void>();

  // Handle video playback
  const handlePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Set video source if not already set
      if (!video.src) {
        video.src = '/videos/intro.mp4';
      }

      // Set initial volume
      video.volume = 0.5;
      
      // Try to play the video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        await playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
              // If autoplay is not allowed, mute and try again
              video.muted = true;
              setIsMuted(true);
              return video.play().then(() => {
                setIsPlaying(true);
              });
            }
            throw error;
          });
      }
    } catch (error) {
      console.error('Error handling video playback:', error);
      setVideoAvailable(false);
      setIsVisible(false);
    }
  }, []);

  // Handle video end
  const handleEnded = useCallback(() => {
    setIsVisible(false);
    setIsPlaying(false);
  }, []);

  // Handle video errors with proper TypeScript types
  const handleError = useCallback((event: Event | React.SyntheticEvent<HTMLVideoElement, Event>) => {
    try {
      const target = (event.target || event.currentTarget) as HTMLVideoElement;
      const error = target.error;
      
      // Define error states
      const errorStates: Record<number, string> = {
        1: 'MEDIA_ERR_ABORTED - Fetching process aborted by user',
        2: 'MEDIA_ERR_NETWORK - Error occurred when downloading',
        3: 'MEDIA_ERR_DECODE - Error occurred when decoding',
        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - Unsupported source/format'
      };
      
      // Prepare error information
      const errorInfo = {
        code: error?.code,
        message: error?.message || 'Unknown error',
        eventType: event?.type,
        currentSrc: target?.currentSrc,
        networkState: target?.networkState,
        readyState: target?.readyState,
        errorState: error?.code !== undefined ? errorStates[error.code] || `Unknown error code: ${error.code}` : 'No error code'
      };
      
      console.error('Video error:', errorInfo);
      
      // Log to error tracking service if available
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(new Error('Video playback error'), {
          extra: errorInfo
        });
      }
    } catch (error) {
      console.error('Error in error handler:', error);
    } finally {
      setVideoAvailable(false);
      setIsVisible(false);
      setIsPlaying(false);
    }
  }, []);

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        // Page is hidden, pause video
        video.pause();
      } else if (isPlaying) {
        // Page is visible again, resume playback if it was playing
        video.play().catch(console.error);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  // Set up video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Event handler wrappers for proper TypeScript types
    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);
    const handleEndedEvent = () => handleEnded();
    const handleErrorEvent = (e: Event) => handleError(e);

    // Add event listeners with proper types
    video.addEventListener('play', handlePlayEvent);
    video.addEventListener('pause', handlePauseEvent);
    video.addEventListener('ended', handleEndedEvent);
    video.addEventListener('error', handleErrorEvent);

    // Start playback
    handlePlay();

    // Cleanup function
    cleanupRef.current = () => {
      try {
        video.pause();
        video.removeEventListener('play', handlePlayEvent);
        video.removeEventListener('pause', handlePauseEvent);
        video.removeEventListener('ended', handleEndedEvent);
        video.removeEventListener('error', handleErrorEvent);
        
        // Don't reset the source to prevent potential errors
        // The browser will handle cleanup when the element is removed
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
    
    // If unmuting, try to play the video
    if (!video.muted && video.paused) {
      video.play().catch(error => {
        console.error('Error resuming video:', error);
        // If unmuting fails, mute again
        video.muted = true;
        setIsMuted(true);
      });
    }
  }, []);

  // Don't render anything if video is not available or not visible
  if (!isVisible || !videoAvailable) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        autoPlay
        preload="auto"
        onError={handleError}
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