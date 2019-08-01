from antlr4 import InputStream

class CaseChangingStream():
	def __init__(self, stream: InputStream, upper: bool):
		self._stream = stream
		self._upper = upper

	def __getattr__(self, name: str):
		return self._stream.__getattribute__(name)

	def LA(self, offset: int):
		c = self._stream.LA(offset)
		if c <= 0:
			return c
		return ord(chr(c).upper() if self._upper else chr(c).lower())
