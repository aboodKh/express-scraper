import puppeteer from "puppeteer";

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto("https://majra.me/opportunities");

	// try {
	// 	await page.click("button[title = 'All Types']");
	// } catch (e) {
	// 	console.log("type button", e);
	// }

	// try {
	// 	// await page.waitForSelector("ul > li:nth-child(7) > a", {timeout: 10000});
	// 	await page.click("ul > li:nth-child(7)> a");
	// } catch (e) {
	// 	console.log("remote link", e);
	// }

	await page.evaluate(() => {
		// redundant step, but show how we get to remote anchor tag
		$("button[title = 'All Types' ]").click();

		const a: HTMLAnchorElement | null = document.querySelector(
			"ul > li:nth-child(7) > a"
		);
		a!.click();
		// $("ul > li:nth-child(7) > a").first().click();
	});

	await page.waitForTimeout(5000);

	const titles = await page.evaluate(() => {
		const tits: string[] = [];
		const elements = document.querySelectorAll("h4.card-title > a");
		elements.forEach((element: any) => tits.push(element.innerHTML));
		return tits;
	});
	console.log(titles);
	await browser.close();
})();
