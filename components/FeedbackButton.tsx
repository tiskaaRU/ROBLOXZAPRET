'use client';

import React, { useState, useEffect } from 'react';

export function FeedbackButton() {
    const [hasVoted, setHasVoted] = useState<boolean | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [votes, setVotes] = useState({ yes: 0, no: 0 });

    useEffect(() => {
        const voted = localStorage.getItem('roblox-bypass-voted');
        setHasVoted(voted !== null);

        // Fetch current votes
        fetch('/api/vote')
            .then(res => res.json())
            .then(data => {
                if (data && typeof data.yes === 'number') {
                    setVotes(data);
                }
            })
            .catch(console.error);
    }, []);

    const handleVote = async (type: 'yes' | 'no') => {
        if (hasVoted || submitting) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type }),
            });

            if (res.ok) {
                const newVotes = await res.json();
                setVotes(newVotes);
                setHasVoted(true);
                localStorage.setItem('roblox-bypass-voted', type);
            } else if (res.status === 429) {
                // If rate limited, it means user likely voted already.
                // Just hide the button and don't annoy them.
                setHasVoted(true);
                localStorage.setItem('roblox-bypass-voted', type);
            }
        } catch (error) {
            console.error('Failed to submit vote:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Still checking localStorage
    if (hasVoted === null) {
        return (
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[32px] p-6 md:p-8 shadow-xl shadow-black/20">
                <div className="flex justify-center">
                    <div className="w-32 h-12 bg-slate-800 rounded-2xl animate-pulse" />
                </div>
            </div>
        );
    }

    // Hide completely after voting
    if (hasVoted) {
        return null;
    }

    return (
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[32px] p-6 md:p-8 shadow-xl shadow-black/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="text-center relative z-10">
                <h3 className="text-lg md:text-xl font-black text-slate-100 mb-2">
                    Помог ли вам этот сайт?
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                    Ваш голос помогает нам улучшать инструкции
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => handleVote('yes')}
                        disabled={submitting}
                        className="px-8 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Да, помог! ({votes.yes})
                    </button>
                    <button
                        onClick={() => handleVote('no')}
                        disabled={submitting}
                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Нет ({votes.no})
                    </button>
                </div>
            </div>
        </div>
    );
}
