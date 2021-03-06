import { Keyword } from './keyword';

describe('keywords', () => {
	describe('constructor', () => {
		it('should recognize the simplest form', () => {
			const k = new Keyword('_');
			expect(k.toString()).toEqual('_');
		});

		it('should consider an empty token as 1', () => {
			const k = new Keyword('_', ['']);
			expect(k.toString()).toEqual('_');
		});

		it('should recognize all tokens', () => {
			const k = new Keyword('_npx', [
				'1c',
				'2',
				'3',
				'4t',
				'"perl-brace-format"',
			]);
			expect(k.toString()).toEqual('_npx:1c,2,3,4t,"perl-brace-format"');
		});

		it('should detect meanings for arguments', () => {
			expect(() => new Keyword('_', ['1c', '1'])).toThrow(
				new Error('Multiple meanings for argument #1 for function "_"!'),
			);
		});

		it('should detect multiple context arguments', () => {
			expect(() => new Keyword('_', ['1c', '2c', '3'])).toThrow(
				new Error('Multiple context arguments for function "_"!'),
			);
		});

		it('should detect multiple total arguments', () => {
			expect(() => new Keyword('_', ['1', '2t', '3t'])).toThrow(
				new Error('Multiple total arguments for function "_"!'),
			);
		});

		it('should detect excess forms', () => {
			expect(() => new Keyword('_', ['1', '3', '5'])).toThrow(
				new Error('Too many forms for function "_"!'),
			);
		});

		it('should detect excess comments', () => {
			expect(() => new Keyword('_', ['"comment1"', '1', '"comment2"'])).toThrow(
				new Error('Multiple extracted comments for function "_"!'),
			);
		});

		it('should discard garbage', () => {
			expect(() => new Keyword('_', ['1', '2q'])).toThrow(
				new Error('Invalid argument specification "2q" for function "_"!'),
			);
		});
	});

	describe('from string', () => {
		it('should recognize all tokens', () => {
			const arg = '_npx:1c,2,3,4t,"perl-brace-format"';
			expect(Keyword.from(arg).toString()).toEqual(arg);
		});

		it('should accept a comment only', () => {
			const arg = '_x:"perl-brace-format"';
			expect(Keyword.from(arg).toString()).toEqual('_x:1,"perl-brace-format"');
		});
	});
});
