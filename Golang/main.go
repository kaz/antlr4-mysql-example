package main

import (
	"fmt"
	"io/ioutil"
	"reflect"
	"strings"

	"github.com/antlr/antlr4/runtime/Go/antlr"
	"github.com/kaz/antlr4-mysql-example/Golang/parser"
)

type (
	parserListener struct {
		*parser.BaseMySqlParserListener

		depth int
	}
)

func (pl *parserListener) EnterEveryRule(ctx antlr.ParserRuleContext) {
	fmt.Println(strings.Repeat("  ", pl.depth), reflect.TypeOf(ctx))
	pl.depth += 1
}
func (pl *parserListener) ExitEveryRule(ctx antlr.ParserRuleContext) {
	pl.depth -= 1
}

func main() {
	sql, err := ioutil.ReadFile("../target.sql")
	if err != nil {
		panic(err)
	}

	psr := parser.NewMySqlParser(antlr.NewCommonTokenStream(parser.NewMySqlLexer(NewCaseChangingStream(antlr.NewInputStream(string(sql)), true)), 0))
	listener := &parserListener{}

	antlr.ParseTreeWalkerDefault.Walk(listener, psr.Root())
}
