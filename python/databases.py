mc_to_lily_pre_note_modifiers = {
    "stemUp" : "\\stemUp",
    "stemDown" : "\\stemDown",
    "beamStemLeftCount0" : "\n\\set stemLeftBeamCount = #0\n",
    "beamStemLeftCount1" : "\n\\set stemLeftBeamCount = #1\n",
    "beamStemLeftCount2" : "\n\\set stemLeftBeamCount = #2\n",
    "beamStemLeftCount3" : "\n\\set stemLeftBeamCount = #3\n",
    "beamStemLeftCount4" : "\n\\set stemLeftBeamCount = #4\n",
    "beamStemLeftCount5" : "\n\\set stemLeftBeamCount = #5\n",
    "beamStemRightCount0" : "\n\\set stemRightBeamCount = #0\n",
    "beamStemRightCount1" : "\n\\set stemRightBeamCount = #1\n",
    "beamStemRightCount2" : "\n\\set stemRightBeamCount = #2\n",
    "beamStemRightCount3" : "\n\\set stemRightBeamCount = #3\n",
    "beamStemRightCount4" : "\n\\set stemRightBeamCount = #4\n",
    "beamStemRightCount5" : "\n\\set stemRightBeamCount = #5\n"
}

mc_to_lily_post_note_modifiers = {
    "tie" : "~",
    "gliss" : "\\glissando",
    "slurBegin" : "(",
    "slurEnd" : ")",
    "phrasingSlurBegin" : "\\(",
    "phrasingSlurEnd" : "\\)",
    "tremolo8" : ":8",
    "tremolo16" : ":16",
    "tremolo32" : ":32",
    
    "pedalBegin" : "\\sustainOn",
    "pedalLift" : "\\sustainOff\\sustainOn",
    "pedalEnd" : "\\sustainOff",
    "pianoFinger1" : "-1",
    "pianoFinger2" : "-2",
    "pianoFinger3" : "-3",
    "pianoFinger4" : "-4",
    "pianoFinger5" : "-5",
    
    "crescBegin" : "\\<",
    "crescendoBegin" : "\\<",
    "crescEnd" : "\\!",
    "crescendoEnd" : "\\!",
    "decrescBegin" : "\\>",
    "decrescendoBegin" : "\\>",
    "decrescEnd" : "\\!",
    "decrescendoEnd" : "\\!",
    "dimBegin" : "\\>",
    "diminuendoBegin" : "\\>",
    "dimEnd" : "\\!",
    "diminuendoEnd" : "\\!",

    "crescTextBegin" : "\\cresc",
    "crescendoTextBegin" : "\\cresc",
    "crescTextEnd" : "\\!",
    "crescendoTextEnd" : "\\!",
    "decrescTextBegin" : "\\decresc",
    "decrescendoTextBegin" : "\\decresc",
    "decrescTextEnd" : "\\!",
    "decrescendoTextEnd" : "\\!",
    "dimTextBegin" : "\\decresc",
    "diminuendoTextBegin" : "\\decresc",
    "dimTextEnd" : "\\!",
    "diminuendoTextEnd" : "\\!",

    "beamNone" : "\\noBeam",
    "beamBegin" : "[",
    "beamBeginUp" : "^[",
    "beamBeginDown" : "_[",
    "beamEnd" : "]",

    # Empty strings because these are taken care of BEFORE the note
    "beamStemLeftCount0" : "",
    "beamStemLeftCount1" : "",
    "beamStemLeftCount2" : "",
    "beamStemLeftCount3" : "",
    "beamStemLeftCount4" : "",
    "beamStemLeftCount5" : "",
    "beamStemRightCount0" : "",
    "beamStemRightCount1" : "",
    "beamStemRightCount2" : "",
    "beamStemRightCount3" : "",
    "beamStemRightCount4" : "",
    "beamStemRightCount5" : "",

    # Stem neutral to reset stemming environment after the note 
    "stemUp" : "\\stemNeutral",
    "stemDown" : "\\stemNeutral"
}

pre_modifier_order = {
    'stemUp' : 0,
    'stemDown' : 1,
    'beamStemLeftCount0' : 2,
    'beamStemLeftCount1' : 3,
    'beamStemLeftCount2' : 4,
    'beamStemLeftCount3' : 5,
    'beamStemLeftCount4' : 6,
    'beamStemLeftCount5' : 7,
    'beamStemRightCount0' : 8,
    'beamStemRightCount1' : 9,
    'beamStemRightCount2' : 10,
    'beamStemRightCount3' : 11,
    'beamStemRightCount4' : 12,
    'beamStemRightCount5' : 13
}

post_modifier_order = {
    'beamNone' : 0,
    'beamBegin' : 1,
    'beamBeginUp' : 1,
    'beamBeginDown' : 1,
    'beamEnd': 1,
    'beamStemLeftCount0' : 2,
    'beamStemLeftCount1' : 3,
    'beamStemLeftCount2' : 4,
    'beamStemLeftCount3' : 5,
    'beamStemLeftCount4' : 6,
    'beamStemLeftCount5' : 7,
    'beamStemRightCount0' : 8,
    'beamStemRightCount1' : 9,
    'beamStemRightCount2' : 10,
    'beamStemRightCount3' : 11,
    'beamStemRightCount4' : 12,
    'beamStemRightCount5' : 13,
    'staccato' : 14,
    'tenuto' : 15,
    'accent' : 16,
    'marcato' : 17,
    'fermata' : 18,
    'tie' : 19,
    'gliss' : 20,
    'glissando': 20,
    'phrasingSlurEnd' : 21,
    'slurEnd' : 22,
    'phrasingSlurBegin' : 23,
    'slurBegin' : 24,
    'tremolo8' : 25,
    'tremolo16' : 25,
    'tremolo32' : 25,
    'trill' : 26,
    'pedalBegin' : 27,
    'pedalEnd' : 27,
    'pedalLift' : 27,
    'pianoFinger1' : 28,
    'pianoFinger2' : 29,
    'pianoFinger3' : 30,
    'pianoFinger4' : 31,
    'pianoFinger5' : 32,
    'ppp' : 33,
    'pp' : 33,
    'p' : 33,
    'mp' : 33,
    'mf' : 33,
    'f' : 33,
    'ff' : 33,
    'fff' : 33,
    'sp' : 33,
    'sf' : 33,
    'sfz' : 33,
    'fp' : 33,
    'crescEnd' : 34,
    'crescTextEnd' : 34,
    'crescendoEnd' : 34,
    'crescendoTextEnd' : 34,
    'decrescEnd' : 34,
    'decrescTextEnd' : 34,
    'decrescendoEnd' : 34,
    'decrescendoTextEnd' : 34,
    'dimEnd' : 34,
    'dimTextEnd' : 34,
    'diminuendoEnd' : 34,
    'diminuendoTextEnd' : 34,
    'crescBegin' : 35,
    'crescTextBegin' : 35,
    'crescendoBegin' : 35,
    'crescendoTextBegin' : 35,
    'decrescBegin' : 35,
    'decrescTextBegin' : 35,
    'decrescendoBegin' : 35,
    'decrescendoTextBegin' : 35,
    'dimBegin' : 35,
    'dimTextBegin' : 35,
    'diminuendoBegin' : 35,
    'diminuendoTextBegin' : 35,
    'stemUp' : 36,
    'stemDown' : 36
}


instr_to_short_instr = {
    "Piccolo" : "Picc.",
    "Flute" : "Fl.",
    "Oboe" : "Ob.",
    "English Horn" : "E. H.",
    "Clarinet" : "Cl.",
    "Bass Clarinet" : "B. Cl.",
    "Bassoon" : "Bsn.",
    "Double Bassoon" : "D. Bsn.",
    "Contrabassoon" : "C. bsn.",
    "Horn" : "Hn.",
    "French Horn" : "Hn.",
    "Cornet" : "Cor.",
    "Trumpet" : "Tpt.",
    "Trombone" : "Tbn.",
    "Tuba" : "Tb.",
    "Triangle" : "Trgl.",
    "Cymbals" : "Cym.",
    "Bass drum" : "B. d.",
    "Snare drum" : "S. d.",
    "Tambourine" : "Tamb.",
    "Castanets" : "Cast.",
    "Gong" : "Gng.",
    "Tubular Bells" : "T. b.",
    "Tubular bells" : "T. b.",
    "Chimes" : "T. b.",
    "Glockenspiel" : "Glock.",
    "Xylophone" : "Xyl.",
    "Celesta" : "Cel.",
    "Piano" : "Pno.",
    "Harp" : "Hp.",
    "Violin" : "Vln.",
    "Viola" : "Vla.",
    "Violoncello" : "Vc.",
    "Cello" : "Vc.",
    "Double Bass" : "D. B.",
    "Double bass" : "D. B.",
    "Guitar" : "Gui."
}

grand_staffs = [
    "Piano",
    "Electric Piano",
    "Keyboard",
    "Harp",
    "Harpsichord",
    "Accordion",
    "Celesta",
    "Organ",
    "Church Organ",
    "Pipe Organ",
    "Jazz Organ",
    "Rock Organ"
]

normal_to_midi = {
    "electric piano" : "electric piano 1",
    "bass clarinet" : "clarinet",
    "double bassoon" : "bassoon",
    "contrabassoon" : "bassoon",
    "horn" : "french horn",
    "cornet" : "trumpet",
    "chimes" : "tubular bells",
    "piano" : "acoustic grand",
    "harp" : "orchestral harp",
    "violoncello" : "cello",
    "guitar" : "acoustic guitar (steel)",
    "double bass" : "acoustic bass"
}