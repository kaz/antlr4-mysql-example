import sys
sys.path.insert(0, "parser")

from antlr4 import *
from MySqlLexer import MySqlLexer
from MySqlParser import MySqlParser
from MySqlParserListener import MySqlParserListener
from CaseChangingInputStream import CaseChangingInputStream

class Listener(MySqlParserListener):
	def __init__(self):
		self.depth = 0

	def enterEveryRule(self, ctx):
		print("  " * self.depth + ctx.__class__.__name__)
		self.depth += 1

	def exitEveryRule(self, ctx):
		self.depth -= 1

stream = FileStream("../target.sql")

parser = MySqlParser(CommonTokenStream(MySqlLexer(CaseChangingInputStream(stream, True))))
listener = Listener()

ParseTreeWalker().walk(listener, parser.root())
