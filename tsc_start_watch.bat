@rem npm i -g typescript@next
@rem npm install tsd -g
@rem tsd install react-global --save
@rem tsd install jquery --save
@rem tsd install angular --save
@rem tsc --init 
start /min %~dp0/src/main/webapp
%~d0
cd %~dp0
tsc 