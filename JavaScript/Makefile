.PHONY: bench
bench: parser/MySqlLexer.js parser/MySqlParser.js
	time node index.js

parser/MySqlLexer.js parser/MySqlParser.js: parser/antlr.jar parser/MySqlLexer.g4 parser/MySqlParser.g4
	java -jar $< -Dlanguage=JavaScript $(@D)/*.g4

parser/antlr.jar:
	curl -o $@ https://www.antlr.org/download/antlr-4.7.2-complete.jar

parser/MySqlLexer.g4:
	curl -o $@ https://raw.githubusercontent.com/antlr/grammars-v4/master/mysql/MySqlLexer.g4

parser/MySqlParser.g4:
	curl -o $@ https://raw.githubusercontent.com/antlr/grammars-v4/master/mysql/MySqlParser.g4
