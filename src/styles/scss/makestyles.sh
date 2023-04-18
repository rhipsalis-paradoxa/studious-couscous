#!/bin/sh


styles=$(ls *.scss)
suffix=".scss"

for stylesht in $styles; do
    if [[ ! $stylesht == "_"* ]] 
    then
        basename=${stylesht%'.scss'}
        echo "Making css for $stylesht....."
        sass $stylesht "../$basename.module.css"

        
    fi

done 