'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';

// Debug logger
const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[IntroVideo] ${message}`, data || '');
  }
};

export default function IntroVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cleanupRef = useRef<() => void>();
  
  // Unique ID for this component instance
  const instanceId = useRef(`video-${Math.random().toString(36).substr(2, 9)}`);
  
  debug(`Component mounted with ID: ${instanceId.current}`);

  // List of supported video formats in order of preference
  const videoFormats = [
    { type: 'video/mp4', src: '/videos/intro.mp4' },
    { type: 'video/webm', src: '/videos/intro.webm' },
    { type: 'video/ogg', src: '/videos/intro.ogv' }
  ];

  // Current format being tried
  const currentFormatIndex = useRef(0);
  
  // Try loading the next available video format
  const tryNextFormat = useCallback((video: HTMLVideoElement, instance: string) => {
    currentFormatIndex.current++;
    
    if (currentFormatIndex.current < videoFormats.length) {
      const { type, src } = videoFormats[currentFormatIndex.current];
      debug(`[${instance}] Trying next video format:`, { type, src });
      
      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      
      // Clear existing sources
      while (video.firstChild) {
        video.removeChild(video.firstChild);
      }
      
      video.appendChild(source);
      video.load();
      return true;
    }
    
    return false;
  }, []);

  // Handle video playback
  const handlePlay = useCallback(async () => {
    const video = videoRef.current;
    const instance = instanceId.current;
    
    debug(`[${instance}] handlePlay called`, { 
      videoReady: !!video,
      currentSrc: video?.currentSrc,
      readyState: video?.readyState,
      networkState: video?.networkState,
      error: video?.error,
      formatIndex: currentFormatIndex.current
    });
    
    if (!video) {
      debug(`[${instance}] Video ref not available`);
      return;
    }

    try {
      // Set video source if not already set
      if (!video.hasChildNodes()) {
        const { type, src } = videoFormats[currentFormatIndex.current];
        debug(`[${instance}] Setting initial video source:`, { type, src });
        
        const source = document.createElement('source');
        source.src = src;
        source.type = type;
        
        video.appendChild(source);
        
        // Add event listeners for source loading
        const onLoadedData = () => {
          debug(`[${instance}] Video loaded successfully`, {
            readyState: video.readyState,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            duration: video.duration,
            currentSrc: video.currentSrc
          });
          
          // Clean up the listener
          video.removeEventListener('loadeddata', onLoadedData);
        };
        
        const onError = () => {
          debug(`[${instance}] Error loading video source`, {
            error: video.error,
            readyState: video.readyState,
            networkState: video.networkState,
            currentSrc: video.currentSrc
          });
          
          // Try next format if available
          if (!tryNextFormat(video, instance)) {
            debug(`[${instance}] No more formats to try`);
            setVideoAvailable(false);
          }
          
          // Clean up the listener
          video.removeEventListener('error', onError as any);
        };
        
        video.addEventListener('loadeddata', onLoadedData);
        video.addEventListener('error', onError as any);
        
        // Load the video
        video.load();
      }

      // Set initial volume and mute state
      video.volume = 0.5;
      video.muted = isMuted;
      
      debug(`[${instance}] Attempting to play video`, {
        muted: video.muted,
        paused: video.paused,
        readyState: video.readyState,
        networkState: video.networkState
      });
      
      // Try to play the video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        await playPromise
          .then(() => {
            debug(`[${instance}] Video started playing successfully`, {
              currentTime: video.currentTime,
              duration: video.duration,
              paused: video.paused
            });
            setIsPlaying(true);
          })
          .catch(error => {
            debug(`[${instance}] Error in play promise:`, {
              error: error.name,
              message: error.message,
              muted: video.muted,
              readyState: video.readyState
            });
            
            if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
              // If autoplay is not allowed, mute and try again
              debug(`[${instance}] Retrying with muted audio`);
              video.muted = true;
              setIsMuted(true);
              return video.play().then(() => {
                debug(`[${instance}] Video started playing after muting`);
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

  // Handle video errors with proper TypeScript types and detailed logging
  const handleError = useCallback((event: Event | React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const instance = instanceId.current;
    debug(`[${instance}] handleError called`, { eventType: event?.type });
    
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
        instanceId: instance,
        code: error?.code,
        message: error?.message || 'Unknown error',
        eventType: event?.type,
        currentSrc: target?.currentSrc,
        networkState: target?.networkState,
        readyState: target?.readyState,
        errorState: error?.code !== undefined ? 
          (errorStates[error.code] || `Unknown error code: ${error.code}`) : 
          'No error code',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'n/a'
      };
      
      // Log detailed error information
      console.error(`[${instance}] Video error:`, errorInfo);
      
      // Log to error tracking service if available
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(new Error('Video playback error'), {
          extra: errorInfo
        });
      }
      
      // Log additional debugging information
      debug(`[${instance}] Video element state on error:`, {
        paused: target?.paused,
        ended: target?.ended,
        seeking: target?.seeking,
        buffered: target?.buffered?.length ? target.buffered.length : 0,
        videoWidth: target?.videoWidth,
        videoHeight: target?.videoHeight,
        duration: target?.duration,
        currentTime: target?.currentTime
      });
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
    const instance = instanceId.current;
    const video = videoRef.current;
    
    debug(`[${instance}] Setting up video element`);
    
    if (!video) {
      debug(`[${instance}] Video ref not available during setup`);
      return;
    }

    // Event handler wrappers with logging
    const handlePlayEvent = () => {
      debug(`[${instance}] Play event triggered`);
      setIsPlaying(true);
    };
    
    const handlePauseEvent = () => {
      debug(`[${instance}] Pause event triggered`);
      setIsPlaying(false);
    };
    
    const handleEndedEvent = () => {
      debug(`[${instance}] Video ended`);
      handleEnded();
    };
    
    const handleErrorEvent = (e: Event) => {
      debug(`[${instance}] Error event received`);
      handleError(e);
    };
    
    // Track all event listeners for proper cleanup
    const eventListeners: [string, EventListenerOrEventListenerObject][] = [
      ['play', handlePlayEvent],
      ['playing', () => debug(`[${instance}] Playing event triggered`)],
      ['pause', handlePauseEvent],
      ['ended', handleEndedEvent],
      ['error', handleErrorEvent],
      ['waiting', () => debug(`[${instance}] Waiting for data`)],
      ['canplay', () => debug(`[${instance}] Can play through`)],
      ['stalled', () => debug(`[${instance}] Media loading stalled`)]
    ];

    // Add all event listeners
    eventListeners.forEach(([event, handler]) => {
      video.addEventListener(event, handler);
    });
    
    debug(`[${instance}] Added ${eventListeners.length} event listeners`);

    // Start playback
    debug(`[${instance}] Starting video playback`);
    handlePlay().catch(error => {
      debug(`[${instance}] Error during initial play:`, error);
      handleError({ target: video, type: 'playback-error' } as any);
    });

    // Cleanup function
    cleanupRef.current = () => {
      const cleanupInstance = instanceId.current;
      debug(`[${cleanupInstance}] Cleaning up video element`);
      
      try {
        // Pause video
        if (!video.paused) {
          debug(`[${cleanupInstance}] Pausing video during cleanup`);
          video.pause();
        }
        
        // Reset video element
        debug(`[${cleanupInstance}] Resetting video source`);
        video.removeAttribute('src');
        video.load();
        
        // Remove all event listeners
        eventListeners.forEach(([event, handler]) => {
          video.removeEventListener(event, handler);
        });
        
        debug(`[${cleanupInstance}] Removed all event listeners`);
        
      } catch (error) {
        console.error(`[${cleanupInstance}] Error during cleanup:`, error);
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
  if (!isVisible) return null;

  if (!videoAvailable) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Video Unavailable</h2>
          <p className="mb-4">We're having trouble loading the video. This might be due to an unsupported format or network issues.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
        onCanPlayThrough={(e) => debug(`[${instanceId.current}] Video can play through`, e)}
        onStalled={(e) => debug(`[${instanceId.current}] Video stalled`, e)}
        onWaiting={(e) => debug(`[${instanceId.current}] Video waiting`, e)}
        onLoadStart={(e) => debug(`[${instanceId.current}] Video load started`, e)}
      >
        {/* Sources will be added dynamically */}
        <p>Your browser does not support the video tag.</p>
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