import sys
sys.path.insert(0, "parser")

from antlr4 import *
from MySqlLexer import MySqlLexer
from MySqlParser import MySqlParser
from MySqlParserListener import MySqlParserListener

class Listener(MySqlParserListener):
	def enterEveryRule(self, ctx:ParserRuleContext):
		print(ctx)

	def exitEveryRule(self, ctx:ParserRuleContext):
		print(ctx)

parser = MySqlParser(CommonTokenStream(MySqlLexer(FileStream("../target.sql"))))
listener = Listener()

ParseTreeWalker().walk(listener, parser.root())
