package main

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/antlr/antlr4/runtime/Go/antlr"
	"github.com/kaz/antlr4-mysql-example/Golang/parser"
)

type (
	Listener struct {
		*parser.BaseMySqlParserListener

		depth int
	}
)

func (l *Listener) EnterEveryRule(ctx antlr.ParserRuleContext) {
	fmt.Println(strings.Repeat("  ", l.depth), reflect.TypeOf(ctx))
	l.depth += 1
}
func (l *Listener) ExitEveryRule(ctx antlr.ParserRuleContext) {
	l.depth -= 1
}

func main() {
	stream, err := antlr.NewFileStream("../target.sql")
	if err != nil {
		panic(err)
	}

	psr := parser.NewMySqlParser(antlr.NewCommonTokenStream(parser.NewMySqlLexer(NewCaseChangingStream(stream, true)), 0))
	listener := &Listener{}

	antlr.ParseTreeWalkerDefault.Walk(listener, psr.Root())
}
