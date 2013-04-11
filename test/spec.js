// Generated by CoffeeScript 1.4.0
(function() {
  var should;

  should = chai.should();

  describe("Basic", function() {
    describe("passing null or undefined", function() {
      return it("should return null", function() {
        should.not.exist(Creatable.create(null));
        return should.not.exist(Creatable.create(void 0));
      });
    });
    describe('passing a string or number', function() {
      return it('should return a TextNode with the string or number as its content', function() {
        Creatable.create('test').should.have.property('nodeType', 3);
        return Creatable.create('test').should.have.property('textContent', 'test');
      });
    });
    describe('passing a tagName in brackets', function() {
      return it('should create an element with that tagName', function() {
        return Creatable.create(['div']).nodeName.should.equal('DIV');
      });
    });
    describe('passing text as the second argument', function() {
      return it('should create an element with the given text content', function() {
        var el;
        el = Creatable.create(['p', 'This is a test.']);
        el.nodeName.should.equal('P');
        return $(el).text().should.equal('This is a test.');
      });
    });
    return describe('passing text as the third argument', function() {
      return it('should create an element with the given text content', function() {
        var el;
        el = Creatable.create(['p', {}, 'This is a test.']);
        el.nodeName.should.equal('P');
        return $(el).text().should.equal('This is a test.');
      });
    });
  });

  describe("Ids and Classes", function() {
    describe('div#myId', function() {
      return it('should create a div with an id of myId', function() {
        var el;
        el = Creatable.create(['div#myId']);
        el.nodeName.should.equal('DIV');
        return $(el).attr('id').should.equal('myId');
      });
    });
    describe('#myId', function() {
      return it('should create a div with an id of myId', function() {
        var el;
        el = Creatable.create(['#myId']);
        el.nodeName.should.equal('DIV');
        return $(el).attr('id').should.equal('myId');
      });
    });
    describe('div.myClass', function() {
      return it('should create a div with a class of myClass', function() {
        var el;
        el = Creatable.create(['div.myClass']);
        el.nodeName.should.equal('DIV');
        return $(el).hasClass('myClass').should.be["true"];
      });
    });
    describe('.myClass', function() {
      return it('should create a div with a class of myClass', function() {
        var el;
        el = Creatable.create(['.myClass']);
        el.nodeName.should.equal('DIV');
        return $(el).hasClass('myClass').should.be["true"];
      });
    });
    describe('.class1.class2', function() {
      return it('should create a div with two classes', function() {
        var el;
        el = Creatable.create(['.class1.class2']);
        el.nodeName.should.equal('DIV');
        $(el).hasClass('class1').should.be["true"];
        return $(el).hasClass('class2').should.be["true"];
      });
    });
    return describe('#myId.myClass', function() {
      return it('should create a div with both an id and a class', function() {
        var el;
        el = Creatable.create(['#myId.myClass']);
        el.nodeName.should.equal('DIV');
        $(el).attr('id').should.equal('myId');
        return $(el).hasClass('myClass').should.be["true"];
      });
    });
  });

  describe('Attributes', function() {
    describe('passing an object as the second argument', function() {
      return it('should create an element with attributes', function() {
        var el;
        el = Creatable.create([
          'a', {
            href: 'http://google.com',
            target: '_blank'
          }
        ]);
        $(el).attr('href').should.equal('http://google.com');
        return $(el).attr('target').should.equal('_blank');
      });
    });
    return describe('using css-syntax and a class attribute', function() {
      return it('should create a div with both classes', function() {
        var el;
        el = Creatable.create([
          '.class1', {
            'class': 'class2'
          }
        ]);
        $(el).hasClass('class1').should.be["true"];
        return $(el).hasClass('class2').should.be["true"];
      });
    });
  });

  describe('Children', function() {
    describe('passing an array of children', function() {
      return it('should create an element with the appropriate children', function() {
        var el;
        el = Creatable.create(['div', [['a'], ['p']]]);
        el.nodeName.should.equal('DIV');
        el.childNodes.should.have.length(2);
        el.childNodes[0].nodeName.should.equal('A');
        return el.childNodes[1].nodeName.should.equal('P');
      });
    });
    describe('null or undefined children', function() {
      return it('should be ignored', function() {
        var el;
        el = Creatable.create(['div', [['a'], null, void 0, ['p']]]);
        el.childNodes.should.have.length(2);
        el.childNodes[0].nodeName.should.equal('A');
        return el.childNodes[1].nodeName.should.equal('P');
      });
    });
    describe('document fragment', function() {
      it('should be created from an empty array', function() {
        var el;
        el = Creatable.create([]);
        el.nodeType.should.equal(11);
        return el.childNodes.should.have.length(0);
      });
      return it('should be created from an array of children', function() {
        var el;
        el = Creatable.create([[['a'], ['p']]]);
        el.nodeType.should.equal(11);
        el.childNodes.should.have.length(2);
        el.childNodes[0].nodeName.should.equal('A');
        return el.childNodes[1].nodeName.should.equal('P');
      });
    });
    return describe('descendant css syntax', function() {
      it('should create children', function() {
        var el;
        el = Creatable.create(['div p a']);
        el.nodeName.should.equal('DIV');
        el.firstChild.nodeName.should.equal('P');
        return el.firstChild.firstChild.nodeName.should.equal('A');
      });
      return it('should add classes and attributes to the final descendant', function() {
        var el;
        el = Creatable.create([
          'div p a.button', {
            href: 'http://google.com'
          }
        ]);
        return $(el.firstChild.firstChild).attr('href').should.equal('http://google.com');
      });
    });
  });

  describe('Other Features', function() {
    describe('unescaped HTML content', function() {
      return it('should be able to be added with the attribute of { html: true }', function() {
        var el;
        el = Creatable.create([
          'ul', {
            html: true
          }, '<li>A</li><li>B</li><li>C</li>'
        ]);
        el.childNodes.should.have.length(3);
        el.firstChild.nodeName.should.equal('LI');
        return el.firstChild.textContent.should.equal('A');
      });
    });
    describe('checked, disabled, selected attributes', function() {
      it('should convert true to the attribute name', function() {
        var checked, disabled, selected;
        checked = Creatable.create([
          "input", {
            type: "radio",
            checked: true
          }
        ]);
        disabled = Creatable.create([
          "input", {
            type: "text",
            disabled: true
          }
        ]);
        selected = Creatable.create([
          "select", [
            [
              "option", {
                selected: true
              }
            ]
          ]
        ]);
        $(checked).prop('checked').should.be["true"];
        $(disabled).attr('disabled').should.equal('disabled');
        return $(selected.firstChild).attr('selected').should.equal('selected');
      });
      return it('should not render the attribute when set to false', function() {
        var checked, disabled, selected;
        checked = Creatable.create([
          "input", {
            type: "radio",
            checked: false
          }
        ]);
        disabled = Creatable.create([
          "input", {
            type: "text",
            disabled: false
          }
        ]);
        selected = Creatable.create([
          "select", [
            [
              "option", {
                selected: false
              }
            ]
          ]
        ]);
        checked.hasAttribute('checked').should.be["false"];
        disabled.hasAttribute('disabled').should.be["false"];
        return selected.firstChild.hasAttribute('selected').should.be["false"];
      });
    });
    describe('TextNode', function() {});
    describe('DocumentFragment', function() {});
    describe('Element', function() {});
    return describe('createHtml', function() {
      return it('should render creatable markup to a string', function() {
        return Creatable.createHtml(['a#go.small.button', 'test']).should.equal('<a id="go" class="small button">test</a>');
      });
    });
  });

}).call(this);
