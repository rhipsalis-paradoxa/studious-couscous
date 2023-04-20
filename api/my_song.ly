\version "2.24.1"
\header {
    title = "My Title"
    subtitle = "Jingle Bells"
    composer = "Me"
}

DSfine = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#t #t #f)
  \once \override Score.RehearsalMark.self-alignment-X = #RIGHT
  \mark \markup { \small "D.S. al fine" }
}

DCfine = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#t #t #f)
  \once \override Score.RehearsalMark.self-alignment-X = #RIGHT
  \mark \markup { \small "D.C. al fine" }
}

DCcoda = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#t #t #f)
  \once \override Score.RehearsalMark.self-alignment-X = #RIGHT
  \mark \markup { \small "D.C. al coda" }
}

DScoda = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#t #t #f)
  \once \override Score.RehearsalMark.self-alignment-X = #RIGHT
  \mark \markup { \small "D.S. al coda" }
}

Fine = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#t #t #f)
  \mark \markup { \small \italic "fine" }
}

GotoCoda = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#t #t #f)
  \once \override Score.RehearsalMark.self-alignment-X = #RIGHT
  \mark \markup { \small "To Coda" \raise #0.5 \smaller \musicglyph #"scripts.coda" }
}

Coda = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#f #t #t)
  \mark \markup { " " \musicglyph #"scripts.coda" \lower #0.9 "Coda" }
}

Segno = {
  \once \override Score.RehearsalMark #'break-visibility = #'#(#f #t #t)
  \mark \markup { \small \musicglyph #"scripts.segno" }
}

\paper { left-margin = 0.75\in }

<<
\new Staff \with {
    instrumentName = "Flute "
    shortInstrumentName = "Fl. "
    midiInstrument = "flute"
} {
    { \clef treble \defaultTimeSignature
\time 4/4 \key c \major \tempo "Allegro non troppo" 4 = 120 \stemDown e'4\staccato -1 \stemNeutral e'4\staccato \marcato \key ces \minor r2 e'4\( d'4( \stemUp <c' e' g' >2\staccato \marcato ) \ff \stemNeutral e'4\) g'4 c'4. d'8 e'1 }
<<
\new Voice { \voiceOne f'4 f'4 f'4. f'8 }
\new Voice { \voiceTwo c'2\< c'2\! }
>> \oneVoice

{ \tuplet 3/2 { f'4\decresc e'4\! e'4~ } e'4 e'4\! e'4\sustainOn d'4 d'4\sustainOff\sustainOn e'4 d'2\sustainOff g'2 \clef bass e'4 e'4 e'2 e'4 e'4 e'2 }
<<
\new Voice { \voiceOne c'4 d'4 e'4 f'4 }
\new Voice { \voiceTwo g1 }
>> \oneVoice

\set Score.repeatCommands = #'((volta "1, 2"))
 { f'4 f'4 } \clef alto { f'4. f'8 f'4 f'4 f'4 f'4 } { f'2 f'2 f'2. f'4 }
\set Score.repeatCommands = #'((volta #f))

{ f'4 f'4 }
\clef alto
{ f'4. f'8 f'4 f'4 f'4 f'4 }
{ f'2 f'2 f'2. f'4 }
}
\new Staff \with {
    instrumentName = "Clarinet "
    shortInstrumentName = "Cl. "
    midiInstrument = "clarinet"
} {
    { \clef treble \defaultTimeSignature
\time 4/4 \key d \major c'4 c'4 d'4 e'4 \bar "||" e'4 d'4 c'4 b'4 }
\cadenzaOn \stopStaff
                    \repeat unfold 1 {
                        s1
                        \bar ""
                    }
                    \startStaff \cadenzaOff
                    \break
                    \once \override Staff.KeySignature.break-visibility = #end-of-line-invisible
                    \once \override Staff.Clef.break-visibility = #end-of-line-invisible
                 \Coda { g'4 }
}

>>
